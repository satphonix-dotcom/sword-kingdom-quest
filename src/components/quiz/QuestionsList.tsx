import { useQuery } from "@tanstack/react-query";
import { Question } from "@/types/quiz";
import { supabase } from "@/integrations/supabase/client";

interface QuestionsListProps {
  questions?: Question[];
  quizId?: string;
}

export const QuestionsList = ({ questions, quizId }: QuestionsListProps) => {
  const { data: fetchedQuestions } = useQuery({
    queryKey: ["questions", quizId],
    queryFn: async () => {
      if (!quizId) return [];
      const { data } = await supabase
        .from("questions")
        .select("*")
        .eq("quiz_id", quizId);
      return data || [];
    },
    enabled: !!quizId,
  });

  const displayQuestions = questions || fetchedQuestions;

  if (!displayQuestions?.length) return null;

  return (
    <div className="mt-4">
      <h4 className="font-semibold text-white mb-2">Added Questions:</h4>
      <ul className="space-y-2">
        {displayQuestions.map((q) => (
          <li key={q.id} className="flex items-center gap-2">
            <span className="text-sm px-2 py-1 bg-gray-800 text-white rounded-full">
              Level {q.level}
            </span>
            <span className="text-gray-300">{q.question}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};