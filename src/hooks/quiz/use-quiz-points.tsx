import { useToast } from "@/components/ui/use-toast";
import { calculatePointsToAward, awardPoints } from "@/utils/quiz-points";

export const useQuizPoints = () => {
  const { toast } = useToast();

  const handlePointsAward = async (
    userId: string,
    finalScore: number,
    totalQuestions: number,
    quizPoints: number
  ) => {
    try {
      console.log('Starting points award process:', {
        userId,
        finalScore,
        totalQuestions,
        quizPoints
      });

      const { scorePercentage, pointsToAward } = calculatePointsToAward(
        finalScore,
        totalQuestions,
        quizPoints
      );

      if (pointsToAward > 0) {
        console.log(`Attempting to award ${pointsToAward} points to user ${userId}`);
        
        const { success, error, newTotal } = await awardPoints(userId, pointsToAward);
        
        if (!success || error) {
          console.error("Error awarding points:", error);
          toast({
            title: "Error",
            description: "Failed to award points. Please try again.",
            variant: "destructive",
          });
          return false;
        }
        
        toast({
          title: "Points Awarded!",
          description: `Congratulations! You earned ${pointsToAward} points! New total: ${newTotal}`,
        });
        return true;
      } else if (scorePercentage < 100) {
        console.log("Score below 100%, no points awarded");
        toast({
          title: "Keep practicing!",
          description: "You need a perfect score to earn points. Try again!",
        });
      }
      return false;
    } catch (error) {
      console.error("Error in handlePointsAward:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while awarding points.",
        variant: "destructive",
      });
      return false;
    }
  };

  return { handlePointsAward };
};