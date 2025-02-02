import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Question } from "@/types/quiz";

export const useQuizData = (
  level: number,
  quizId: string | undefined,
  setQuestions: (questions: Question[]) => void,
  setTimeLeft: (time: number) => void,
  setQuizTimeLimit: (limit: number) => void,
) => {
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const query = supabase
          .from("questions")
          .select(`
            *,
            quiz:quizzes (
              time_limit
            )
          `)
          .eq("level", level);

        if (quizId) {
          query.eq("quiz_id", quizId);
        }

        const { data, error } = await query.order("created_at");

        if (error) {
          console.error("Error fetching questions:", error);
          toast({
            title: "Error",
            description: "Failed to fetch questions",
            variant: "destructive",
          });
          return;
        }

        if (!data || data.length === 0) {
          return;
        }

        const timeLimit = data[0]?.quiz?.time_limit || 30;
        setQuizTimeLimit(timeLimit);
        setTimeLeft(timeLimit * 60);

        const transformedQuestions: Question[] = data.map(q => ({
          id: q.id,
          question: q.question,
          correct_answer: q.correct_answer,
          options: Array.isArray(q.options) ? q.options.map(opt => String(opt)) : [],
          level: q.level,
          quiz_id: q.quiz_id
        }));

        setQuestions(transformedQuestions);
      } catch (error) {
        console.error("Error in fetchQuestions:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    };

    fetchQuestions();
  }, [level, quizId, setQuestions, setTimeLeft, setQuizTimeLimit, toast]);
};