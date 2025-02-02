import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useQuizPoints = () => {
  const { toast } = useToast();

  const calculatePointsToAward = (
    finalScore: number,
    totalQuestions: number,
    quizPoints: number = 0
  ) => {
    const scorePercentage = (finalScore / totalQuestions) * 100;
    console.log(`Score percentage: ${scorePercentage}%`);
    const pointsToAward = scorePercentage === 100 ? quizPoints : 0;
    console.log(`Points to award: ${pointsToAward}`);
    return { scorePercentage, pointsToAward };
  };

  const awardPoints = async (userId: string, pointsToAdd: number) => {
    try {
      if (!userId || pointsToAdd <= 0) {
        console.error("Invalid user ID or points value:", { userId, pointsToAdd });
        return { error: new Error("Invalid user ID or points value") };
      }

      console.log(`Attempting to award ${pointsToAdd} points to user ${userId}`);

      const { error } = await supabase.rpc("increment_user_points", {
        user_id: userId,
        points_to_add: pointsToAdd,
      });

      if (error) {
        console.error("Error updating points:", error);
        return { error };
      }

      // Verify the points were actually updated
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("points")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Error verifying points update:", profileError);
        return { error: profileError };
      }

      console.log(
        `Successfully awarded ${pointsToAdd} points to user ${userId}. New total: ${profile.points}`
      );
      return { error: null };
    } catch (error) {
      console.error("Error in awardPoints:", error);
      return { error };
    }
  };

  const handlePointsAward = async (
    userId: string,
    finalScore: number,
    totalQuestions: number,
    quizPoints: number
  ) => {
    const { scorePercentage, pointsToAward } = calculatePointsToAward(
      finalScore,
      totalQuestions,
      quizPoints
    );

    if (pointsToAward > 0) {
      console.log(`Attempting to award ${pointsToAward} points to user ${userId}`);
      const { error: pointsError } = await awardPoints(userId, pointsToAward);
      
      if (pointsError) {
        console.error("Error awarding points:", pointsError);
        toast({
          title: "Error",
          description: "Failed to award points",
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: "Points Awarded!",
        description: `You earned ${pointsToAward} points!`,
      });
      return true;
    } else if (scorePercentage < 100) {
      console.log("Score below 100%, no points awarded");
      toast({
        title: "Keep practicing!",
        description: "You can retake this quiz to achieve a perfect score.",
      });
    }
    return false;
  };

  return { handlePointsAward };
};