import { supabase } from "@/integrations/supabase/client";

export const calculatePointsToAward = (
  finalScore: number,
  totalQuestions: number,
  quizPoints: number = 0
) => {
  // Ensure score percentage doesn't exceed 100%
  const scorePercentage = Math.min((finalScore / totalQuestions) * 100, 100);
  console.log(`Score percentage: ${scorePercentage}%`);
  
  // Award points for perfect scores (100%)
  const pointsToAward = scorePercentage === 100 ? quizPoints : 0;
  console.log(`Points to award: ${pointsToAward}`);
  
  return { scorePercentage, pointsToAward };
};

export const awardPoints = async (
  userId: string,
  pointsToAdd: number
): Promise<{ success: boolean; error: any | null; newTotal: number | null }> => {
  try {
    if (!userId || pointsToAdd <= 0) {
      console.error('Invalid user ID or points value:', { userId, pointsToAdd });
      return { 
        success: false, 
        error: new Error('Invalid user ID or points value'),
        newTotal: null 
      };
    }

    console.log(`Attempting to award ${pointsToAdd} points to user ${userId}`);
    
    // Get current points before update
    const { data: beforeProfile, error: beforeError } = await supabase
      .from('profiles')
      .select('points')
      .eq('id', userId)
      .single();

    if (beforeError) {
      console.error('Error fetching current points:', beforeError);
      return { success: false, error: beforeError, newTotal: null };
    }

    const beforePoints = beforeProfile?.points || 0;
    console.log('Current points before update:', beforePoints);

    // Increment points using the database function
    const { error } = await supabase.rpc('increment_user_points', {
      user_id: userId,
      points_to_add: pointsToAdd
    });

    if (error) {
      console.error('Error updating points:', error);
      return { success: false, error, newTotal: null };
    }

    // Verify the points were actually updated
    const { data: afterProfile, error: afterError } = await supabase
      .from('profiles')
      .select('points')
      .eq('id', userId)
      .single();

    if (afterError) {
      console.error('Error verifying points update:', afterError);
      return { success: false, error: afterError, newTotal: null };
    }

    const afterPoints = afterProfile?.points || 0;
    console.log(`Points before: ${beforePoints}, after: ${afterPoints}`);

    // Verify the points were actually incremented
    if (afterPoints !== beforePoints + pointsToAdd) {
      console.error('Points were not incremented correctly');
      return { 
        success: false, 
        error: new Error('Points increment verification failed'),
        newTotal: afterPoints 
      };
    }

    console.log(`Successfully awarded ${pointsToAdd} points to user ${userId}. New total: ${afterPoints}`);
    return { success: true, error: null, newTotal: afterPoints };
  } catch (error) {
    console.error("Error in awardPoints:", error);
    return { success: false, error, newTotal: null };
  }
};