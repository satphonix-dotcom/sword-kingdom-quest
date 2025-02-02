import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Question } from "@/types/quiz";

export const useQuizCompletion = () => {
  const { toast } = useToast();

  const updateUserPoints = async (pointsToAdd: number, userId: string) => {
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
      console.error("Error in updateUserPoints:", error);
    }
  };

  const handleQuizComplete = async (
    hasAttempted: boolean,
    questions: Question[],
    score: number,
    selectedAnswer: string | null,
    currentQuestionIndex: number
  ) => {
    if (hasAttempted) return;
    
    try {
      const finalScore = score + (selectedAnswer === questions[currentQuestionIndex]?.correct_answer ? 1 : 0);
      const totalQuestions = questions.length;
      
      console.log(`Quiz completed. Final score: ${finalScore}/${totalQuestions}`);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No user found for quiz response');
        return;
      }

      // Get the quiz details to access the points value
      const { data: quiz } = await supabase
        .from("quizzes")
        .select("points")
        .eq("id", questions[0]?.quiz_id)
        .single();

      // Calculate points based on score percentage and quiz points
      const scorePercentage = (finalScore / totalQuestions) * 100;
      let pointsToAward = 0;

      if (scorePercentage === 100) {
        pointsToAward = quiz?.points || 0;
      } else if (scorePercentage >= 70) {
        pointsToAward = Math.floor((quiz?.points || 0) / 2);
      }

      // Check if a response already exists
      const { data: existingResponse } = await supabase
        .from("quiz_responses")
        .select("id, score")
        .eq("quiz_id", questions[0]?.quiz_id)
        .eq("user_id", user.id)
        .maybeSingle();

      let responseError;

      if (existingResponse) {
        // Update existing response if new score is higher
        if (finalScore > existingResponse.score) {
          const { error } = await supabase
            .from("quiz_responses")
            .update({
              answers: questions.map((q, i) => ({
                question_id: q.id,
                selected_answer: i === currentQuestionIndex ? selectedAnswer : null
              })),
              score: finalScore,
              completed_at: new Date().toISOString()
            })
            .eq("id", existingResponse.id);
          responseError = error;
        } else {
          // If existing score is higher or equal, just return the existing score
          return existingResponse.score;
        }
      } else {
        // Insert new response
        const { error } = await supabase
          .from("quiz_responses")
          .insert({
            quiz_id: questions[0]?.quiz_id,
            user_id: user.id,
            answers: questions.map((q, i) => ({
              question_id: q.id,
              selected_answer: i === currentQuestionIndex ? selectedAnswer : null
            })),
            score: finalScore
          });
        responseError = error;
      }

      if (responseError) {
        console.error("Error saving quiz response:", responseError);
        toast({
          title: "Error",
          description: "Failed to save quiz response",
          variant: "destructive",
        });
        return;
      }

      if (pointsToAward > 0) {
        await updateUserPoints(pointsToAward, user.id);
      }

      return finalScore;
    } catch (error) {
      console.error("Error in handleQuizComplete:", error);
      return null;
    }
  };

  return {
    handleQuizComplete,
    updateUserPoints,
  };
};