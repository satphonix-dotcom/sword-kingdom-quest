import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Quiz } from "@/types/quiz";
import { QuizList } from "@/components/quiz/QuizList";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Levels = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const { data: levels } = useQuery({
    queryKey: ["levels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("levels")
        .select("*")
        .order("order_number");

      if (error) throw error;
      return data;
    },
  });

  const { data: quizzes } = useQuery({
    queryKey: ['quizzes', selectedLevel],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quizzes')
        .select(`
          *,
          questions!inner (
            id,
            question,
            correct_answer,
            options,
            quiz_id,
            level
          )
        `)
        .eq('questions.level', selectedLevel);
      
      if (error) throw error;
      return data as Quiz[];
    },
    enabled: !!selectedLevel,
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Levels</h2>
      <div className="flex flex-col space-y-2">
        {levels?.map(level => (
          <button
            key={level.id}
            onClick={() => setSelectedLevel(level.order_number)}
            className="p-2 border rounded"
          >
            Level {level.order_number}: {level.title}
          </button>
        ))}
      </div>

      {quizzes && quizzes.length > 0 ? (
        <QuizList quizzes={quizzes} />
      ) : (
        <Alert>
          <AlertTitle>No Quizzes Found</AlertTitle>
          <AlertDescription>
            No quizzes available for this level. Please select another level.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Levels;
