import { Quiz } from "@/types/quiz";
import { Card, CardContent } from "@/components/ui/card";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface QuizListProps {
  quizzes: Quiz[] | null;
  isLoading?: boolean;
  onQuizzesChange?: (options?: RefetchOptions) => Promise<QueryObserverResult<Quiz[], Error>>;
  onEdit?: (quiz: Quiz) => void;
}

export const QuizList = ({ quizzes, isLoading, onQuizzesChange, onEdit }: QuizListProps) => {
  if (isLoading) {
    return <div className="text-center py-4">Loading quizzes...</div>;
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="text-center py-4">
        No quizzes available for this level yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {quizzes.map((quiz) => (
        <Card 
          key={quiz.id} 
          className="hover:bg-slate-100/90 hover:shadow-md transition-all cursor-pointer border border-slate-200"
          onClick={() => onEdit?.(quiz)}
        >
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold text-white">{quiz.title}</h3>
            {quiz.description && (
              <p className="text-slate-300 mt-1">{quiz.description}</p>
            )}
            <p className="text-sm text-slate-400 mt-2">
              Time limit: {quiz.time_limit || 'No'} minutes
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};