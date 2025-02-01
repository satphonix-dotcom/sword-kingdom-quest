import { Button } from "@/components/ui/button";

interface QuizFormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export const QuizFormActions = ({ onCancel, isSubmitting, isEditing }: QuizFormActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
        className="bg-transparent text-white border-gray-700 hover:bg-gray-800"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        {isSubmitting ? 'Saving...' : (isEditing ? "Update Quiz" : "Create Quiz")}
      </Button>
    </div>
  );
};