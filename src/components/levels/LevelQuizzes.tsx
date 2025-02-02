import React from 'react';
import { QuizList } from '@/components/quiz/QuizList';
import { Quiz } from '@/types/quiz';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

interface LevelQuizzesProps {
  quizzes: Quiz[] | null;
  onQuizzesChange: (options?: RefetchOptions) => Promise<QueryObserverResult<Quiz[], Error>>;
  onQuizSelect?: (quizId: string) => void;
}

export const LevelQuizzes = ({ quizzes, onQuizzesChange, onQuizSelect }: LevelQuizzesProps) => {
  if (!quizzes?.length) {
    return (
      <Alert>
        <AlertTitle>No Quizzes Found</AlertTitle>
        <AlertDescription>
          No quizzes available for this level. Please select another level.
        </AlertDescription>
      </Alert>
    );
  }

  const handleQuizClick = (quiz: Quiz) => {
    onQuizSelect?.(quiz.id);
  };

  return (
    <QuizList 
      quizzes={quizzes} 
      onQuizzesChange={onQuizzesChange}
      onQuizClick={handleQuizClick}
    />
  );
};