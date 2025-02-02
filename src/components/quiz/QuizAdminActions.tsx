import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { Quiz } from "@/types/quiz";

interface QuizAdminActionsProps {
  onEdit: (quiz: Quiz) => void;
  onDelete: (quiz: Quiz) => void;
  quiz: Quiz;
}

export const QuizAdminActions = ({ onEdit, onDelete, quiz }: QuizAdminActionsProps) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(quiz);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(quiz);
  };

  return (
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
  );
};