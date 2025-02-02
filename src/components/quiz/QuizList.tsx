import { Quiz } from "@/types/quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

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
        <Card 
          key={quiz.id} 
          className="hover:bg-slate-100/90 hover:shadow-md transition-all border border-slate-200"
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-white">{quiz.title}</h3>
                {quiz.description && (
                  <p className="text-slate-300 mt-1">{quiz.description}</p>
                )}
                <p className="text-sm text-slate-400 mt-2">
                  Time limit: {quiz.time_limit || 'No'} minutes
                </p>
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit?.(quiz)}
                    className="h-8 w-8"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(quiz)}
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};