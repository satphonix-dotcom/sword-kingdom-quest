import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useQuizAnswer = () => {
  const { toast } = useToast();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showingAnswer, setShowingAnswer] = useState(false);

  const handleAnswerSelect = (answer: string, hasAttempted: boolean) => {
    if (hasAttempted) {
      toast({
        title: "Quiz Already Completed",
        description: "You cannot modify your answers as you've already completed this quiz.",
        variant: "default",
      });
      return;
    }
    setSelectedAnswer(answer);
  };

  const resetAnswer = () => {
    setSelectedAnswer(null);
    setShowingAnswer(false);
  };

  return {
    selectedAnswer,
    showingAnswer,
    setShowingAnswer,
    handleAnswerSelect,
    resetAnswer,
  };
};