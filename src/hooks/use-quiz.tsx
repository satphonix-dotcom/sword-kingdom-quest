import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Question } from "@/types/quiz";

export const useQuiz = (level: number, quizId?: string) => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [quizTimeLimit, setQuizTimeLimit] = useState<number>(30);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    checkPreviousAttempt();
    fetchQuestions();
  }, [level, quizId]);

  useEffect(() => {
    if (timeLeft === null || isQuizComplete) return;

    if (timeLeft <= 0) {
      handleQuizComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isQuizComplete]);

  const checkPreviousAttempt = async () => {
    if (!quizId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: responses, error } = await supabase
        .from("quiz_responses")
        .select("*, quizzes(points)")
        .eq("quiz_id", quizId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error checking previous attempt:", error);
        return;
      }

      if (responses) {
        setHasAttempted(true);
        setScore(responses.score || 0);
        toast({
          title: "Quiz Already Completed",
          description: `You have already completed this quiz with a score of ${responses.score}/${questions.length}`,
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error checking previous attempt:", error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const query = supabase
        .from("questions")
        .select(`
          *,
          quiz:quizzes (
            time_limit
          )
        `)
        .eq("level", level);

      if (quizId) {
        query.eq("quiz_id", quizId);
      }

      const { data, error } = await query.order("created_at");

      if (error) {
        console.error("Error fetching questions:", error);
        toast({
          title: "Error",
          description: "Failed to fetch questions",
          variant: "destructive",
        });
        return;
      }

      if (!data || data.length === 0) {
        return;
      }

      const timeLimit = data[0]?.quiz?.time_limit || 30;
      setQuizTimeLimit(timeLimit);
      setTimeLeft(timeLimit * 60);

      const transformedQuestions: Question[] = data.map(q => ({
        id: q.id,
        question: q.question,
        correct_answer: q.correct_answer,
        options: Array.isArray(q.options) ? q.options.map(opt => String(opt)) : [],
        level: q.level,
        quiz_id: q.quiz_id
      }));

      setQuestions(transformedQuestions);
    } catch (error) {
      console.error("Error in fetchQuestions:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const updateUserPoints = async (pointsToAdd: number) => {
    try {
      console.log("Starting points update process...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('No user found for points update');
        return;
      }

      console.log(`Attempting to award ${pointsToAdd} points to user ${user.id}`);
      
      const { error } = await supabase.rpc('increment_user_points', {
        user_id: user.id,
        points_to_add: pointsToAdd
      });

      if (error) {
        console.error('Error updating points:', error);
        toast({
          title: "Error",
          description: "Failed to update points",
          variant: "destructive",
        });
      } else {
        console.log(`Successfully awarded ${pointsToAdd} points to user ${user.id}`);
        toast({
          title: "Points Awarded!",
          description: `You earned ${pointsToAdd} points!`,
        });
      }
    } catch (error) {
      console.error("Error in updateUserPoints:", error);
    }
  };

  const handleQuizComplete = async () => {
    if (hasAttempted) return;
    
    try {
      setIsQuizComplete(true);
      
      const finalScore = score + (selectedAnswer === questions[currentQuestionIndex]?.correct_answer ? 1 : 0);
      const totalQuestions = questions.length;
      
      console.log(`Quiz completed. Final score: ${finalScore}/${totalQuestions}`);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No user found for quiz response');
        return;
      }

      // Calculate points based on score percentage
      const scorePercentage = (finalScore / totalQuestions) * 100;
      let pointsToAward = 0;

      if (scorePercentage === 100) {
        // Perfect score bonus: level * 10
        pointsToAward = level * 10;
      } else if (scorePercentage >= 70) {
        // Passing score: level * 5
        pointsToAward = level * 5;
      }

      const { error: responseError } = await supabase.from("quiz_responses").insert({
        quiz_id: questions[0]?.quiz_id,
        user_id: user.id,
        answers: questions.map((q, i) => ({
          question_id: q.id,
          selected_answer: i === currentQuestionIndex ? selectedAnswer : null
        })),
        score: finalScore
      });

      if (responseError) {
        console.error("Error saving quiz response:", responseError);
        toast({
          title: "Error",
          description: "Failed to save quiz response",
          variant: "destructive",
        });
        return;
      }

      if (pointsToAward > 0) {
        await updateUserPoints(pointsToAward);
      }

      setScore(finalScore);
    } catch (error) {
      console.error("Error in handleQuizComplete:", error);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (hasAttempted) {
      toast({
        title: "Quiz Already Completed",
        description: "You cannot modify your answers as you've already completed this quiz.",
        variant: "default",
      });
      return;
    }
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = async () => {
    if (!selectedAnswer || hasAttempted) return;

    if (!showingAnswer) {
      setShowingAnswer(true);
      const isCorrect = selectedAnswer === questions[currentQuestionIndex].correct_answer;
      if (isCorrect) {
        setScore(score + 1);
      }
      return;
    }

    if (currentQuestionIndex === questions.length - 1) {
      await handleQuizComplete();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowingAnswer(false);
    }
  };

  return {
    questions,
    currentQuestionIndex,
    selectedAnswer,
    score,
    isQuizComplete,
    timeLeft,
    quizTimeLimit,
    showingAnswer,
    handleAnswerSelect,
    handleNextQuestion,
    handleQuizComplete
  };
};