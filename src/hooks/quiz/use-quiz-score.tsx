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
    // Calculate the final score, ensuring it doesn't exceed the total number of questions
    const lastQuestionCorrect = selectedAnswer === questions[currentQuestionIndex]?.correct_answer;
    const rawScore = currentScore + (lastQuestionCorrect ? 1 : 0);
    const finalScore = Math.min(rawScore, questions.length);
    
    const completionScore = await handleQuizComplete(
      hasAttempted,
      questions,
      finalScore,
      selectedAnswer,
      currentQuestionIndex
    );
    
    if (completionScore !== null) {
      setScore(finalScore);
    }
    return completionScore;
  };

  return {
    score,
    handleScoreUpdate,
    completeQuiz,
  };
};