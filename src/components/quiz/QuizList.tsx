import { Quiz } from "@/types/quiz";
import { QuizCard } from "./QuizCard";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface QuizListProps {
  quizzes: Quiz[] | null;
  isLoading?: boolean;
  onQuizzesChange?: (options?: RefetchOptions) => Promise<QueryObserverResult<Quiz[], Error>>;
  onEdit?: (quiz: Quiz) => void;
}

export const QuizList = ({ quizzes, isLoading, onQuizzesChange, onEdit }: QuizListProps) => {
  const { toast } = useToast();

  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      return profile?.is_admin || false;
    },
  });

  const handleDelete = async (quiz: Quiz) => {
    try {
      const { error } = await supabase
        .from("quizzes")
        .delete()
        .eq("id", quiz.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Quiz deleted successfully",
      });

      onQuizzesChange?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
        <div key={quiz.id} onClick={() => onEdit?.(quiz)}>
          <QuizCard
            quiz={quiz}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
};