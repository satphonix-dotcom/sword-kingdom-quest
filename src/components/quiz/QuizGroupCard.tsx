import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Quiz } from "@/types/quiz";
import { QuizList } from "./QuizList";

interface QuizGroupCardProps {
  levelNumber: number;
  levelTitle: string;
  quizzes: Quiz[];
  onQuizzesChange: () => void;
  onEdit: (quiz: Quiz) => void;
}

export const QuizGroupCard = ({
  levelNumber,
  levelTitle,
  quizzes,
  onQuizzesChange,
  onEdit,
}: QuizGroupCardProps) => {
  return (
    <Card className="border border-slate-200">
      <CardHeader>
        <CardTitle className="text-xl">
          Level {levelNumber}: {levelTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {quizzes.length > 0 ? (
          <QuizList
            quizzes={quizzes}
            onQuizzesChange={onQuizzesChange}
            onEdit={onEdit}
          />
        ) : (
          <p className="text-slate-500">No quizzes available for this level.</p>
        )}
      </CardContent>
    </Card>
  );
};