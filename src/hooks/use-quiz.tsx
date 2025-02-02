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

  useEffect(() => {
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
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const updateUserPoints = async (pointsToAdd: number) => {
    console.log("Updating points:", pointsToAdd);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

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
      toast({
        title: "Success!",
        description: `You earned ${pointsToAdd} points!`,
      });
    }
  };

  const handleQuizComplete = async () => {
    setIsQuizComplete(true);
    
    const finalScore = score + (selectedAnswer === questions[currentQuestionIndex]?.correct_answer ? 1 : 0);
    const totalQuestions = questions.length;
    
    // Check for perfect score (100%)
    if (finalScore === totalQuestions) {
      // Award points based on the level (10 points per level for perfect score)
      const pointsToAward = level * 10;
      console.log("Perfect score! Awarding points:", pointsToAward);
      await updateUserPoints(pointsToAward);
    }

    const { error } = await supabase.from("quiz_responses").insert({
      quiz_id: questions[0]?.quiz_id,
      user_id: (await supabase.auth.getUser()).data.user?.id,
      answers: questions.map((q, i) => ({
        question_id: q.id,
        selected_answer: i === currentQuestionIndex ? selectedAnswer : null
      })),
      score: finalScore
    });

    if (error) {
      console.error("Error saving quiz response:", error);
      toast({
        title: "Error",
        description: "Failed to save quiz response",
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = async () => {
    if (!selectedAnswer) return;

    if (!showingAnswer) {
      setShowingAnswer(true);
      const isCorrect = selectedAnswer === questions[currentQuestionIndex].correct_answer;
      if (isCorrect) {
        setScore(score + 1);
      }
      return;
    }

    if (currentQuestionIndex === questions.length - 1) {
      handleQuizComplete();
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