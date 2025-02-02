import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Quiz } from "@/types/quiz";
import { LevelList } from "@/components/levels/LevelList";
import { LevelQuizzes } from "@/components/levels/LevelQuizzes";

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

  const { data: quizzes, refetch } = useQuery({
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
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h2 className="text-2xl font-bold text-gameGold">Choose Your Level</h2>
      
      <LevelList 
        levels={levels || []} 
        onLevelClick={setSelectedLevel} 
      />

      {selectedLevel && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            Level {selectedLevel} Quizzes
          </h3>
          <LevelQuizzes 
            quizzes={quizzes} 
            onQuizzesChange={refetch}
          />
        </div>
      )}
    </div>
  );
};

export default Levels;