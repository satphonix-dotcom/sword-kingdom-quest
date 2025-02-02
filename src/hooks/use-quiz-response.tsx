import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Quiz } from "@/types/quiz";

export interface QuizResponse {
  id: string;
  score: number;
  isPerfectScore: boolean;
}

export const useQuizResponse = (quiz: Quiz) => {
  const { data: quizResponse } = useQuery({
    queryKey: ['quizResponse', quiz.id],
    queryFn: async () => {
      // Don't make the query if we don't have a valid quiz ID
      if (!quiz.id) return null;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: response } = await supabase
        .from('quiz_responses')
        .select('*, questions:quizzes(questions(*))')
        .eq('quiz_id', quiz.id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (!response) return null;

      const totalQuestions = response.questions?.questions?.length || 0;
      const isPerfectScore = response.score === totalQuestions;
      
      return {
        ...response,
        isPerfectScore
      };
    },
    enabled: !!quiz.id, // Only run the query if we have a quiz ID
  });

  return {
    isCompleted: !!quizResponse,
    isPerfectScore: quizResponse?.isPerfectScore,
    score: quizResponse?.score,
    hasAttempted: !!quizResponse
  };
};