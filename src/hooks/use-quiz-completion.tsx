import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Question } from "@/types/quiz";
import { calculatePointsToAward, awardPoints } from "@/utils/quiz-points";
import { 
  getExistingResponse, 
  updateQuizResponse, 
  createQuizResponse 
} from "@/utils/quiz-responses";

export const useQuizCompletion = () => {
  const { toast } = useToast();

  const handleQuizComplete = async (
    hasAttempted: boolean,
    questions: Question[],
    score: number,
    selectedAnswer: string | null,
    currentQuestionIndex: number
  ) => {
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

      const { scorePercentage, pointsToAward } = calculatePointsToAward(
        finalScore,
        totalQuestions,
        quiz?.points
      );

      // Check if a response already exists
      const existingResponse = await getExistingResponse(questions[0]?.quiz_id, user.id);
      let responseError;

      if (existingResponse) {
        // Only update if we haven't achieved a perfect score yet
        if (existingResponse.score < totalQuestions) {
          const { error } = await updateQuizResponse(
            existingResponse.id,
            questions,
            currentQuestionIndex,
            selectedAnswer,
            finalScore
          );
          responseError = error;
        } else {
          console.log("Perfect score already achieved, no update needed");
          return existingResponse.score;
        }
      } else {
        const { error } = await createQuizResponse(
          questions[0]?.quiz_id,
          user.id,
          questions,
          currentQuestionIndex,
          selectedAnswer,
          finalScore
        );
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
        await awardPoints(user.id, pointsToAward);
      } else if (scorePercentage < 100) {
        console.log("Score below 100%, no points awarded");
        toast({
          title: "Keep practicing!",
          description: "You can retake this quiz to achieve a perfect score.",
        });
      }

      return finalScore;
    } catch (error) {
      console.error("Error in handleQuizComplete:", error);
      return null;
    }
  };

  return {
    handleQuizComplete,
  };
};