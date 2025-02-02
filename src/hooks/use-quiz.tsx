import { useEffect } from "react";
import { useQuizData } from "./use-quiz-data";
import { useQuizState } from "./quiz/use-quiz-state";
import { useQuizScore } from "./quiz/use-quiz-score";
import { useQuizAnswer } from "./quiz/use-quiz-answer";

export const useQuiz = (level: number, quizId?: string) => {
  const {
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
  } = useQuizState();

  const {
    score,
    handleScoreUpdate,
    completeQuiz,
  } = useQuizScore();

  const {
    selectedAnswer,
    showingAnswer,
    setShowingAnswer,
    handleAnswerSelect,
    resetAnswer,
  } = useQuizAnswer();

  useQuizData(level, quizId, setQuestions, setTimeLeft, setQuizTimeLimit);

  useEffect(() => {
    if (timeLeft === null || isQuizComplete) return;

    if (timeLeft <= 0) {
      completeQuiz(hasAttempted, questions, score, selectedAnswer, currentQuestionIndex)
        .then((finalScore) => {
          if (finalScore !== null) {
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

  const handleNextQuestion = async () => {
    if (!selectedAnswer || hasAttempted) return;

    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correct_answer;
    
    if (!showingAnswer) {
      setShowingAnswer(true);
      if (isCorrect) {
        handleScoreUpdate(true, score);
      }
      return;
    }

    if (currentQuestionIndex === questions.length - 1) {
      const finalScore = await completeQuiz(
        hasAttempted,
        questions,
        score,
        selectedAnswer,
        currentQuestionIndex
      );
      if (finalScore !== null) {
        setIsQuizComplete(true);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetAnswer();
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
    handleAnswerSelect: (answer: string) => handleAnswerSelect(answer, hasAttempted),
    handleNextQuestion,
    handleQuizComplete: () => completeQuiz(
      hasAttempted,
      questions,
      score,
      selectedAnswer,
      currentQuestionIndex
    ).then((finalScore) => {
      if (finalScore !== null) {
        setIsQuizComplete(true);
      }
    })
  };
};