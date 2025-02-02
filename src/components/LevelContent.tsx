import React from "react";
import { useQuiz } from "@/hooks/use-quiz";
import { QuizContent } from "./quiz/QuizContent";

interface LevelContentProps {
  level: number;
  onBack: () => void;
  quizId?: string;
}

export const LevelContent = ({ level, onBack, quizId }: LevelContentProps) => {
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
      onAnswerSelect={handleAnswerSelect}
      onNext={handleNextQuestion}
      onBack={onBack}
      onTimeUp={handleQuizComplete}
    />
  );
};