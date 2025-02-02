import { supabase } from "@/integrations/supabase/client";

export const calculatePointsToAward = (finalScore: number, totalQuestions: number, quizPoints: number = 0) => {
  const scorePercentage = (finalScore / totalQuestions) * 100;
  console.log(`Score percentage: ${scorePercentage}%`);
  
  // Only award points for perfect scores
  const pointsToAward = scorePercentage === 100 ? quizPoints : 0;
  console.log(`Points to award: ${pointsToAward}`);
  
  return { scorePercentage, pointsToAward };
};

export const awardPoints = async (userId: string, pointsToAdd: number): Promise<{ error: any | null }> => {
  try {
    if (!userId || pointsToAdd <= 0) {
      console.error('Invalid user ID or points value:', { userId, pointsToAdd });
      return { error: new Error('Invalid user ID or points value') };
    }

    console.log(`Attempting to award ${pointsToAdd} points to user ${userId}`);
    
    const { data, error } = await supabase.rpc('increment_user_points', {
      user_id: userId,
      points_to_add: pointsToAdd
    });

    if (error) {
      console.error('Error updating points:', error);
      return { error };
    }

    // Verify the points were actually updated
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('points')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Error verifying points update:', profileError);
      return { error: profileError };
    }

    console.log(`Successfully awarded ${pointsToAdd} points to user ${userId}. New total: ${profile.points}`);
    return { error: null };
  } catch (error) {
    console.error("Error in awardPoints:", error);
    return { error };
  }
};