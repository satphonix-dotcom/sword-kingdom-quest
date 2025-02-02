import { useState } from "react";
import { Question } from "@/types/quiz";
import { useQuizCompletion } from "../use-quiz-completion";

export const useQuizScore = () => {
  const [score, setScore] = useState(0);
  const { handleQuizComplete } = useQuizCompletion();

  const handleScoreUpdate = (
    isCorrect: boolean,
    currentScore: number
  ): number => {
    const newScore = isCorrect ? currentScore + 1 : currentScore;
    setScore(newScore);
    return newScore;
  };

  const completeQuiz = async (
    hasAttempted: boolean,
    questions: Question[],
    currentScore: number,
    selectedAnswer: string | null,
    currentQuestionIndex: number
  ) => {
    const finalScore = await handleQuizComplete(
      hasAttempted,
      questions,
      currentScore,
      selectedAnswer,
      currentQuestionIndex
    );
    if (finalScore !== null) {
      setScore(finalScore);
    }
    return finalScore;
  };

  return {
    score,
    handleScoreUpdate,
    completeQuiz,
  };
};