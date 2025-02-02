import { useState } from "react";
import { Question } from "@/types/quiz";

export const useQuizState = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [quizTimeLimit, setQuizTimeLimit] = useState<number>(30);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  return {
    questions,
    setQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedAnswer,
    setSelectedAnswer,
    score,
    setScore,
    isQuizComplete,
    setIsQuizComplete,
    timeLeft,
    setTimeLeft,
    quizTimeLimit,
    setQuizTimeLimit,
    showingAnswer,
    setShowingAnswer,
    hasAttempted,
    setHasAttempted,
  };
};