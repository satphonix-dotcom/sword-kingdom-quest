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
        // Only update if we haven't achieved a perfect score yet
        if (existingResponse.score < questions.length) {
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
          console.log("Perfect score already achieved, no update needed");
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