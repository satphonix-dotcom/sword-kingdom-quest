import { supabase } from "@/integrations/supabase/client";
import { Question } from "@/types/quiz";
import { useToast } from "@/components/ui/use-toast";

export const useQuizResponse = () => {
  const { toast } = useToast();

  const handleQuizResponse = async (
    quizId: string,
    userId: string,
    questions: Question[],
    currentQuestionIndex: number,
    selectedAnswer: string | null,
    finalScore: number
  ) => {
    try {
      // Check if a response already exists
      const { data: existingResponse } = await supabase
        .from("quiz_responses")
        .select("id, score")
        .eq("quiz_id", quizId)
        .eq("user_id", userId)
        .maybeSingle();

      if (existingResponse) {
        // Check if user already achieved a perfect score
        if (existingResponse.score >= questions.length) {
          console.log("Perfect score already achieved, no update needed");
          toast({
            title: "Quiz Already Completed",
            description: "You've already achieved a perfect score on this quiz!",
          });
          return existingResponse.score;
        }

        // Only update if the new score is better than the previous score
        if (finalScore > existingResponse.score) {
          const { error } = await supabase
            .from("quiz_responses")
            .update({
              answers: questions.map((q, i) => ({
                question_id: q.id,
                selected_answer: i === currentQuestionIndex ? selectedAnswer : null,
              })),
              score: finalScore,
              completed_at: new Date().toISOString(),
            })
            .eq("id", existingResponse.id);

          if (error) {
            console.error("Error updating quiz response:", error);
            toast({
              title: "Error",
              description: "Failed to save quiz response",
              variant: "destructive",
            });
            return null;
          }
        } else {
          console.log("New score not higher than previous score, no update needed");
          toast({
            title: "Quiz Score",
            description: "You need to achieve a higher score to earn more points!",
          });
          return existingResponse.score;
        }
      } else {
        const { error } = await supabase.from("quiz_responses").insert({
          quiz_id: quizId,
          user_id: userId,
          answers: questions.map((q, i) => ({
            question_id: q.id,
            selected_answer: i === currentQuestionIndex ? selectedAnswer : null,
          })),
          score: finalScore,
        });

        if (error) {
          console.error("Error creating quiz response:", error);
          toast({
            title: "Error",
            description: "Failed to save quiz response",
            variant: "destructive",
          });
          return null;
        }
      }

      return finalScore;
    } catch (error) {
      console.error("Error handling quiz response:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return null;
    }
  };

  return { handleQuizResponse };
};