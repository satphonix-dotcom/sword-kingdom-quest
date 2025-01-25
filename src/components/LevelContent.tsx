import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/quiz";
import { QuizTimer } from "./quiz/QuizTimer";
import { QuizQuestion } from "./quiz/QuizQuestion";
import { QuizComplete } from "./quiz/QuizComplete";

interface LevelContentProps {
  level: number;
  onBack: () => void;
}

export const LevelContent = ({ level, onBack }: LevelContentProps) => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [quizTimeLimit, setQuizTimeLimit] = useState<number>(30);

  useEffect(() => {
    fetchQuestions();
  }, [level]);

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
    const { data: quizData, error: quizError } = await supabase
      .from("quizzes")
      .select("time_limit")
      .eq("id", questions[0]?.quiz_id)
      .single();

    if (quizError) {
      toast({
        title: "Error",
        description: "Failed to fetch quiz details",
        variant: "destructive",
      });
      return;
    }

    if (quizData?.time_limit) {
      setQuizTimeLimit(quizData.time_limit);
      setTimeLeft(quizData.time_limit * 60);
    }

    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("level", level)
      .order("created_at");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch questions",
        variant: "destructive",
      });
      return;
    }

    const transformedQuestions: Question[] = (data || []).map(q => ({
      id: q.id,
      question: q.question,
      correct_answer: q.correct_answer,
      options: Array.isArray(q.options) ? q.options.map(opt => String(opt)) : [],
      level: q.level,
      quiz_id: q.quiz_id
    }));

    setQuestions(transformedQuestions);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleQuizComplete = async () => {
    setIsQuizComplete(true);
    
    const { error } = await supabase.from("quiz_responses").insert({
      quiz_id: questions[0].quiz_id,
      user_id: (await supabase.auth.getUser()).data.user?.id,
      answers: questions.map((q, i) => ({
        question_id: q.id,
        selected_answer: i === currentQuestionIndex ? selectedAnswer : null
      })),
      score: score + (selectedAnswer === questions[currentQuestionIndex]?.correct_answer ? 1 : 0)
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save quiz response",
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = async () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      handleQuizComplete();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  if (questions.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardContent className="p-6">
          <p className="text-center">No questions available for this level yet.</p>
          <Button onClick={onBack} className="mt-4 w-full">
            Go Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Level {level}</span>
          <span className="text-sm">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </CardTitle>
        {timeLeft !== null && !isQuizComplete && (
          <QuizTimer
            timeLeft={timeLeft}
            quizTimeLimit={quizTimeLimit}
            isQuizComplete={isQuizComplete}
            onTimeUp={handleQuizComplete}
          />
        )}
      </CardHeader>
      <CardContent className="p-6">
        {isQuizComplete ? (
          <QuizComplete
            score={score}
            totalQuestions={questions.length}
            onBack={onBack}
          />
        ) : (
          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNextQuestion}
            onBack={onBack}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        )}
      </CardContent>
    </Card>
  );
};