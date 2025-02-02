import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Quiz, Level } from "@/types/quiz";
import { LevelSelection } from "@/components/quiz/LevelSelection";
import { LevelContent } from "@/components/LevelContent";
import { useToast } from "@/hooks/use-toast";
import { LevelQuizzes } from "@/components/levels/LevelQuizzes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Levels = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: levels, isLoading: isLoadingLevels, error: levelsError } = useQuery({
    queryKey: ["levels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("levels")
        .select("*")
        .order("order_number");

      if (error) throw error;
      return data as Level[];
    },
  });

  const { data: quizzes, isLoading: isLoadingQuizzes, refetch: refetchQuizzes } = useQuery({
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
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to load quizzes",
          variant: "destructive",
        });
        throw error;
      }
      return data as Quiz[];
    },
    enabled: !!selectedLevel,
  });

  if (levelsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          Failed to load levels. Please try again later.
        </div>
      </div>
    );
  }

  if (isLoadingLevels) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading levels...</div>
      </div>
    );
  }

  const handleLevelSelect = (levelNumber: number) => {
    setSelectedQuizId(null);
    setSelectedLevel(levelNumber);
  };

  const handleBack = () => {
    if (selectedQuizId) {
      setSelectedQuizId(null);
    } else {
      setSelectedLevel(null);
    }
  };

  const handleQuizSelect = (quizId: string) => {
    setSelectedQuizId(quizId);
  };

  const selectedLevelData = levels?.find(l => l.order_number === selectedLevel);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-background to-muted">
      {selectedQuizId ? (
        <LevelContent
          level={selectedLevel!}
          onBack={handleBack}
          quizId={selectedQuizId}
        />
      ) : selectedLevel ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gameGold">
              Level {selectedLevel}: {selectedLevelData?.title}
            </h2>
            <Button onClick={handleBack} variant="outline">
              Back to Levels
            </Button>
          </div>
          <Card className="p-6">
            {isLoadingQuizzes ? (
              <div className="text-center py-4">Loading quizzes...</div>
            ) : (
              <LevelQuizzes
                quizzes={quizzes || null}
                onQuizzesChange={refetchQuizzes}
                onQuizSelect={handleQuizSelect}
              />
            )}
          </Card>
        </div>
      ) : (
        <LevelSelection
          levels={levels}
          onLevelClick={handleLevelSelect}
        />
      )}
    </div>
  );
};

export default Levels;