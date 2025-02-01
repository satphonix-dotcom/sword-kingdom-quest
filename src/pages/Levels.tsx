import React, { useState } from 'react';
import { HomeNavigation } from '@/components/home/HomeNavigation';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LevelSelection } from '@/components/quiz/LevelSelection';
import { QuizList } from '@/components/quiz/QuizList';

const Levels = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const { data: levels, isLoading: isLoadingLevels } = useQuery({
    queryKey: ['levels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('levels')
        .select('*')
        .order('order_number', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuery({
    queryKey: ['quizzes', selectedLevel],
    queryFn: async () => {
      if (!selectedLevel) return [];
      
      const { data, error } = await supabase
        .from('quizzes')
        .select(`
          *,
          questions!inner (level)
        `)
        .eq('questions.level', selectedLevel);
      
      if (error) throw error;
      return data;
    },
    enabled: !!selectedLevel,
  });

  const handleLevelClick = (levelNumber: number) => {
    setSelectedLevel(levelNumber);
  };

  const handleBack = () => {
    setSelectedLevel(null);
  };

  const handleQuizClick = (quizId: string) => {
    navigate(`/quiz/${quizId}`);
  };

  if (isLoadingLevels) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate">
        <HomeNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-gameGold text-center">Loading levels...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate">
      <HomeNavigation />
      <div className="container mx-auto px-4 py-8">
        {selectedLevel ? (
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              className="text-gameGold mb-4"
              onClick={handleBack}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Levels
            </Button>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Level {selectedLevel} Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <QuizList 
                  quizzes={quizzes}
                  isLoading={isLoadingQuizzes}
                  onQuizClick={handleQuizClick}
                />
              </CardContent>
            </Card>
          </div>
        ) : (
          <LevelSelection 
            levels={levels}
            onLevelClick={handleLevelClick}
          />
        )}
      </div>
    </div>
  );
};

export default Levels;