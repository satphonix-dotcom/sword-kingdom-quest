import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const calculatePointsToAward = (finalScore: number, totalQuestions: number, quizPoints: number = 0) => {
  const scorePercentage = (finalScore / totalQuestions) * 100;
  console.log(`Score percentage: ${scorePercentage}%`);
  
  const pointsToAward = scorePercentage === 100 ? quizPoints : 0;
  console.log(`Points to award: ${pointsToAward}`);
  
  return { scorePercentage, pointsToAward };
};

export const awardPoints = async (userId: string, pointsToAdd: number) => {
  const { toast } = useToast();
  
  try {
    console.log("Starting points update process...");
    
    if (!userId) {
      console.error('No user found for points update');
      return;
    }

    console.log(`Attempting to award ${pointsToAdd} points to user ${userId}`);
    
    const { error } = await supabase.rpc('increment_user_points', {
      user_id: userId,
      points_to_add: pointsToAdd
    });

    if (error) {
      console.error('Error updating points:', error);
      toast({
        title: "Error",
        description: "Failed to update points",
        variant: "destructive",
      });
    } else {
      console.log(`Successfully awarded ${pointsToAdd} points to user ${userId}`);
      toast({
        title: "Points Awarded!",
        description: `You earned ${pointsToAdd} points!`,
      });
    }
  } catch (error) {
    console.error("Error in awardPoints:", error);
  }
};