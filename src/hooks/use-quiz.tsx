import { useEffect } from "react";
import { useQuizState } from "./use-quiz-state";
import { useQuizData } from "./use-quiz-data";
import { useQuizCompletion } from "./use-quiz-completion";
import { useToast } from "@/hooks/use-toast";

export const useQuiz = (level: number, quizId?: string) => {
  const { toast } = useToast();
  const {
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
  } = useQuizState();

  const { handleQuizComplete } = useQuizCompletion();

  useQuizData(level, quizId, setQuestions, setTimeLeft, setQuizTimeLimit);

  useEffect(() => {
    if (timeLeft === null || isQuizComplete) return;

    if (timeLeft <= 0) {
      handleQuizComplete(hasAttempted, questions, score, selectedAnswer, currentQuestionIndex)
        .then((finalScore) => {
          if (finalScore !== null) {
            setScore(finalScore);
            setIsQuizComplete(true);
          }
        });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isQuizComplete]);

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

    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correct_answer;
    let currentScore = score;
    
    if (!showingAnswer) {
      setShowingAnswer(true);
      if (isCorrect) {
        currentScore = score + 1;
        setScore(currentScore);
      }
      return;
    }

    if (currentQuestionIndex === questions.length - 1) {
      const finalScore = await handleQuizComplete(hasAttempted, questions, currentScore, selectedAnswer, currentQuestionIndex);
      if (finalScore !== null) {
        setScore(finalScore);
        setIsQuizComplete(true);
      }
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
    handleQuizComplete: () => handleQuizComplete(hasAttempted, questions, score, selectedAnswer, currentQuestionIndex)
      .then((finalScore) => {
        if (finalScore !== null) {
          setScore(finalScore);
          setIsQuizComplete(true);
        }
      })
  };
};