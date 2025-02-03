import React from 'react';
import { QuizList } from '@/components/quiz/QuizList';
import { Quiz } from '@/types/quiz';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { useQuizResponse } from '@/hooks/use-quiz-response';
import { useToast } from '@/hooks/use-toast';

interface LevelQuizzesProps {
  quizzes: Quiz[] | null;
  onQuizzesChange: (options?: RefetchOptions) => Promise<QueryObserverResult<Quiz[], Error>>;
  onQuizSelect?: (quizId: string) => void;
}

export const LevelQuizzes = ({ quizzes, onQuizzesChange, onQuizSelect }: LevelQuizzesProps) => {
  const { toast } = useToast();

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
    const { isPerfectScore } = useQuizResponse(quiz);
    
    if (isPerfectScore) {
      toast({
        title: "Quiz Completed",
        description: "You've already achieved a perfect score on this quiz!",
      });
      return;
    }
    
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