import { Quiz } from "@/types/quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Trophy } from "lucide-react";

interface QuizCardProps {
  quiz: Quiz;
  isAdmin?: boolean;
  onEdit?: (quiz: Quiz) => void;
  onDelete?: (quiz: Quiz) => void;
}

export const QuizCard = ({ quiz, isAdmin, onEdit, onDelete }: QuizCardProps) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(quiz);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(quiz);
  };

  // Calculate potential points (10 points per level)
  const potentialPoints = quiz.questions?.[0]?.level ? quiz.questions[0].level * 10 : 0;

  return (
    <Card 
      className="hover:bg-slate-800/90 hover:shadow-md transition-all border border-slate-200 cursor-pointer"
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">{quiz.title}</h3>
            {quiz.description && (
              <p className="text-slate-300 mt-1">{quiz.description}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <p className="text-sm text-slate-400">
                Time limit: {quiz.time_limit || 'No'} minutes
              </p>
              <div className="flex items-center gap-1 text-gameGold">
                <Trophy className="h-4 w-4" />
                <span className="text-sm">{potentialPoints} points</span>
              </div>
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
                variant="outline"
                size="icon"
                onClick={handleDelete}
                className="h-8 w-8 text-red-500 hover:text-red-600"
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