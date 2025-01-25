import { Button } from "@/components/ui/button";

interface QuizCompleteProps {
  score: number;
  totalQuestions: number;
  onBack: () => void;
}

export const QuizComplete = ({ score, totalQuestions, onBack }: QuizCompleteProps) => {
  return (
    <div className="text-center space-y-4">
      <h3 className="text-2xl font-bold">Quiz Complete!</h3>
      <p className="text-xl">
        Your score: {score} out of {totalQuestions}
      </p>
      <Button onClick={onBack} className="mt-4">
        Return to Levels
      </Button>
    </div>
  );
};