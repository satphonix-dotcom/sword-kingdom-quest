import { Quiz } from "@/types/quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useQuizResponse } from "@/hooks/use-quiz-response";
import { QuizMetadataDisplay } from "./QuizMetadataDisplay";
import { QuizAdminActions } from "./QuizAdminActions";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface QuizCardProps {
  quiz: Quiz;
  onClick?: () => void;
  onEdit?: (quiz: Quiz) => void;
  onDelete?: (quiz: Quiz) => void;
  isAdmin?: boolean;
}

export const QuizCard = ({ quiz, onClick, onEdit, onDelete, isAdmin = false }: QuizCardProps) => {
  const { isCompleted, isPerfectScore } = useQuizResponse(quiz);

  const { data: isUserAdmin } = useQuery({
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

  return (
    <Card 
      className="hover:bg-slate-800/90 hover:shadow-md transition-all border border-slate-200 cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-white">{quiz.title}</h3>
              {isPerfectScore && (
                <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
            {quiz.description && (
              <p className="text-slate-300 mt-1">{quiz.description}</p>
            )}
            <QuizMetadataDisplay
              quiz={quiz}
              isCompleted={isCompleted}
              isPerfectScore={isPerfectScore}
            />
          </div>
          {isAdmin && isUserAdmin && onEdit && onDelete && (
            <QuizAdminActions
              quiz={quiz}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};