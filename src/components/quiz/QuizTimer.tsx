import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface QuizTimerProps {
  timeLeft: number | null;
  quizTimeLimit: number;
  isQuizComplete: boolean;
  onTimeUp: () => void;
}

export const QuizTimer = ({ timeLeft, quizTimeLimit, isQuizComplete, onTimeUp }: QuizTimerProps) => {
  const { toast } = useToast();

  useEffect(() => {
    if (timeLeft === null || isQuizComplete) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      if (timeLeft === 60) {
        toast({
          title: "Time running out!",
          description: "You have 1 minute remaining",
          variant: "destructive",
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isQuizComplete, onTimeUp, toast]);

  if (timeLeft === null) return null;

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Time Remaining:</span>
        <span className={`font-mono ${timeLeft <= 60 ? 'text-red-500' : ''}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <Progress value={(timeLeft / (quizTimeLimit * 60)) * 100} />
    </div>
  );
};