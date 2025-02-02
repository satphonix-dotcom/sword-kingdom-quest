import React from "react";
import { useQuiz } from "@/hooks/use-quiz";
import { QuizContent } from "./quiz/QuizContent";
import { useQuizResponse } from "@/hooks/use-quiz-response";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface LevelContentProps {
  level: number;
  onBack: () => void;
  quizId?: string;
}

export const LevelContent = ({ level, onBack, quizId }: LevelContentProps) => {
  const { data: quiz } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: async () => {
      if (!quizId) return null;
      const { data } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', quizId)
        .single();
      return data;
    },
    enabled: !!quizId,
  });

  const { isPerfectScore } = useQuizResponse(quiz || { id: '' });

  const {
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
  } = useQuiz(level, quizId);

  return (
    <QuizContent
      level={level}
      questions={questions}
      currentQuestionIndex={currentQuestionIndex}
      selectedAnswer={selectedAnswer}
      score={score}
      isQuizComplete={isQuizComplete}
      timeLeft={timeLeft}
      quizTimeLimit={quizTimeLimit}
      showingAnswer={showingAnswer}
      isPerfectScore={isPerfectScore}
      onAnswerSelect={handleAnswerSelect}
      onNext={handleNextQuestion}
      onBack={onBack}
      onTimeUp={handleQuizComplete}
    />
  );
};