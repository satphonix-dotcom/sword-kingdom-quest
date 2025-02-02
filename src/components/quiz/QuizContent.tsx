import React from "react";
import { Question } from "@/types/quiz";
import { QuizTimer } from "./QuizTimer";
import { QuizQuestion } from "./QuizQuestion";
import { QuizComplete } from "./QuizComplete";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trophy } from "lucide-react";

interface QuizContentProps {
  level: number;
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  score: number;
  isQuizComplete: boolean;
  timeLeft: number | null;
  quizTimeLimit: number;
  showingAnswer: boolean;
  isPerfectScore?: boolean;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  onBack: () => void;
  onTimeUp: () => void;
}

export const QuizContent = ({
  level,
  questions,
  currentQuestionIndex,
  selectedAnswer,
  score,
  isQuizComplete,
  timeLeft,
  quizTimeLimit,
  showingAnswer,
  isPerfectScore,
  onAnswerSelect,
  onNext,
  onBack,
  onTimeUp
}: QuizContentProps) => {
  if (isPerfectScore) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardContent className="p-6">
          <Alert className="mb-4 bg-green-500/10 border-green-500">
            <Trophy className="h-5 w-5 text-green-500" />
            <AlertDescription className="ml-2">
              Congratulations! You've already achieved a perfect score on this quiz!
            </AlertDescription>
          </Alert>
          <Button onClick={onBack} className="w-full">
            Go Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardContent className="p-6">
          <p className="text-center">No questions available for this quiz yet.</p>
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
            onTimeUp={onTimeUp}
          />
        )}
      </CardHeader>
      <CardContent className="p-6">
        {isQuizComplete ? (
          <QuizComplete
            score={score}
            totalQuestions={questions.length}
            level={level}
            onBack={onBack}
          />
        ) : (
          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={onAnswerSelect}
            onNext={onNext}
            onBack={onBack}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
            showingAnswer={showingAnswer}
          />
        )}
      </CardContent>
    </Card>
  );
};