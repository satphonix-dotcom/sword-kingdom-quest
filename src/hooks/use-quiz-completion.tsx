import { Question } from "@/types/quiz";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuizResponse } from "./quiz/use-quiz-response";
import { useQuizPoints } from "./quiz/use-quiz-points";

export const useQuizCompletion = () => {
  const { toast } = useToast();
  const { handleQuizResponse } = useQuizResponse();
  const { handlePointsAward } = useQuizPoints();

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
        toast({
          title: "Error",
          description: "User not found",
          variant: "destructive",
        });
        return null;
      }

      // Get the quiz details to access the points value
      const { data: quiz, error: quizError } = await supabase
        .from("quizzes")
        .select("points")
        .eq("id", questions[0]?.quiz_id)
        .single();

      if (quizError) {
        console.error('Error fetching quiz points:', quizError);
        toast({
          title: "Error",
          description: "Failed to fetch quiz information",
          variant: "destructive",
        });
        return null;
      }

      // Handle quiz response
      const responseScore = await handleQuizResponse(
        questions[0]?.quiz_id,
        user.id,
        questions,
        currentQuestionIndex,
        selectedAnswer,
        finalScore
      );

      if (responseScore === null) {
        return null;
      }

      // Handle points award
      await handlePointsAward(
        user.id,
        finalScore,
        totalQuestions,
        quiz?.points || 0
      );

      return finalScore;
    } catch (error) {
      console.error("Error in handleQuizComplete:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    handleQuizComplete,
  };
};