import { Button } from "@/components/ui/button";

interface QuizActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
}

export const QuizActions = ({ onCancel, onSubmit }: QuizActionsProps) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onSubmit}>Create Quiz</Button>
    </div>
  );
};