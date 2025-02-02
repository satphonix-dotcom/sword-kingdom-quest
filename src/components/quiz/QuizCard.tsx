import { Quiz } from "@/types/quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Trophy, CheckCircle2 } from "lucide-react";
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
  const { data: quizResponse } = useQuery({
    queryKey: ['quizResponse', quiz.id],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: response } = await supabase
        .from('quiz_responses')
        .select('*, questions:quizzes(questions(*))')
        .eq('quiz_id', quiz.id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (!response) return null;

      // Calculate total questions for the quiz
      const totalQuestions = response.questions?.questions?.length || 0;
      
      return {
        ...response,
        isPerfectScore: response.score === totalQuestions
      };
    },
  });

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(quiz);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(quiz);
  };

  const isCompleted = !!quizResponse;
  const isPerfectScore = quizResponse?.isPerfectScore;

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
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
            </div>
            {quiz.description && (
              <p className="text-slate-300 mt-1">{quiz.description}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <p className="text-sm text-slate-400">
                Time limit: {quiz.time_limit || 'No'} minutes
              </p>
              <div className="flex items-center gap-1 text-gameGold">
                <Trophy className="h-4 w-4" />
                <span className="text-sm">{quiz.points} points</span>
              </div>
              {isCompleted && (
                <span className={`text-sm ${isPerfectScore ? 'text-green-500' : 'text-yellow-500'}`}>
                  {isPerfectScore ? 'Perfect Score!' : 'Completed'}
                </span>
              )}
            </div>
          </div>
          {isAdmin && (
            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleEdit}
                className="h-8 w-8"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={handleDelete}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};