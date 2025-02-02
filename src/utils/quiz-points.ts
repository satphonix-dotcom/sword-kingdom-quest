import { supabase } from "@/integrations/supabase/client";

export const calculatePointsToAward = (finalScore: number, totalQuestions: number, quizPoints: number = 0) => {
  const scorePercentage = (finalScore / totalQuestions) * 100;
  console.log(`Score percentage: ${scorePercentage}%`);
  
  const pointsToAward = scorePercentage === 100 ? quizPoints : 0;
  console.log(`Points to award: ${pointsToAward}`);
  
  return { scorePercentage, pointsToAward };
};

export const awardPoints = async (userId: string, pointsToAdd: number): Promise<{ error: any | null }> => {
  try {
    console.log(`Attempting to award ${pointsToAdd} points to user ${userId}`);
    
    const { error } = await supabase.rpc('increment_user_points', {
      user_id: userId,
      points_to_add: pointsToAdd
    });

    if (error) {
      console.error('Error updating points:', error);
      return { error };
    }

    console.log(`Successfully awarded ${pointsToAdd} points to user ${userId}`);
    return { error: null };
  } catch (error) {
    console.error("Error in awardPoints:", error);
    return { error };
  }
};