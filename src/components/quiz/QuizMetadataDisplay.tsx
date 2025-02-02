import { Trophy } from "lucide-react";
import { Quiz } from "@/types/quiz";

interface QuizMetadataDisplayProps {
  quiz: Quiz;
  isCompleted: boolean;
  isPerfectScore: boolean;
}

export const QuizMetadataDisplay = ({ quiz, isCompleted, isPerfectScore }: QuizMetadataDisplayProps) => {
  return (
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
  );
};