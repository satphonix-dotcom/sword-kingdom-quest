import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Level } from '@/types/quiz';

interface LevelCardProps {
  level: Level;
  onClick: () => void;
}

export const LevelCard = ({ level, onClick }: LevelCardProps) => {
  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <h3 className="text-xl font-bold">Level {level.order_number}</h3>
        <p className="text-sm text-gray-500">{level.title}</p>
        {level.description && (
          <p className="text-xs text-gray-400 mt-1">{level.description}</p>
        )}
        <p className="text-sm text-gameGold mt-2">{level.points} points</p>
      </CardContent>
    </Card>
  );
};