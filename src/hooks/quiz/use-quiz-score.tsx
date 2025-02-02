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
    if (isCorrect) {
      const newScore = currentScore + 1;
      setScore(newScore);
      return newScore;
    }
    return currentScore;
  };

  const completeQuiz = async (
    hasAttempted: boolean,
    questions: Question[],
    currentScore: number,
    selectedAnswer: string | null,
    currentQuestionIndex: number
  ) => {
    // Don't add to score during completion, use the current score
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