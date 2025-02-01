import React from 'react';
import { HomeNavigation } from '@/components/home/HomeNavigation';
import { LevelButton } from '@/components/LevelButton';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const Levels = () => {
  const { data: levels, isLoading } = useQuery({
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

  if (isLoading) {
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
        <h1 className="text-4xl font-bold text-gameGold mb-8 text-center">Choose Your Challenge</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels?.map((level) => (
            <LevelButton
              key={level.id}
              level={level.order_number}
              title={level.title}
              description={level.description || ''}
              points={level.points}
              isLocked={level.is_locked}
              onClick={() => {/* Handle level selection */}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Levels;