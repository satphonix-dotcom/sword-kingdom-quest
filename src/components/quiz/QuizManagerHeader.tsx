import { Button } from "@/components/ui/button";

interface QuizManagerHeaderProps {
  onCreateClick: () => void;
}

export const QuizManagerHeader = ({ onCreateClick }: QuizManagerHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Quizzes</h2>
      <Button onClick={onCreateClick}>Create Quiz</Button>
    </div>
  );
};