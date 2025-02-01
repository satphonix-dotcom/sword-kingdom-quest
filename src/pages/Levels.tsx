import React, { useState } from 'react';
import { HomeNavigation } from '@/components/home/HomeNavigation';
import { LevelButton } from '@/components/LevelButton';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
                {isLoadingQuizzes ? (
                  <div className="text-center py-4">Loading quizzes...</div>
                ) : quizzes && quizzes.length > 0 ? (
                  <div className="space-y-4">
                    {quizzes.map((quiz) => (
                      <Card 
                        key={quiz.id} 
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                        onClick={() => handleQuizClick(quiz.id)}
                      >
                        <CardContent className="p-4">
                          <h3 className="text-xl font-semibold">{quiz.title}</h3>
                          {quiz.description && (
                            <p className="text-gray-600 mt-1">{quiz.description}</p>
                          )}
                          <p className="text-sm text-gray-500 mt-2">
                            Time limit: {quiz.time_limit || 'No'} minutes
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    No quizzes available for this level yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-gameGold mb-8 text-center">
              Choose Your Challenge
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels?.map((level) => (
                <LevelButton
                  key={level.id}
                  level={level.order_number}
                  title={level.title}
                  description={level.description || ''}
                  points={level.points}
                  isLocked={level.is_locked}
                  onClick={() => handleLevelClick(level.order_number)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Levels;