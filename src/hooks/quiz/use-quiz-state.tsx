import { useState } from "react";
import { Question } from "@/types/quiz";

export const useQuizState = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [quizTimeLimit, setQuizTimeLimit] = useState<number>(30);
  const [hasAttempted, setHasAttempted] = useState(false);

  return {
    questions,
    setQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    isQuizComplete,
    setIsQuizComplete,
    timeLeft,
    setTimeLeft,
    quizTimeLimit,
    setQuizTimeLimit,
    hasAttempted,
    setHasAttempted,
  };
};