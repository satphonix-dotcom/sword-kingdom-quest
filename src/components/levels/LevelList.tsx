import React from 'react';
import { LevelCard } from './LevelCard';
import { Level } from '@/types/quiz';

interface LevelListProps {
  levels: Level[];
  onLevelClick: (levelNumber: number) => void;
}

export const LevelList = ({ levels, onLevelClick }: LevelListProps) => {
  if (!levels?.length) {
    return (
      <p className="text-center text-gray-500">
        No levels available at the moment.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {levels.map((level) => (
        <LevelCard
          key={level.id}
          level={level}
          onClick={() => onLevelClick(level.order_number)}
        />
      ))}
    </div>
  );
};