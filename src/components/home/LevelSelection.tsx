import React from 'react';
import { LevelButton } from '@/components/LevelButton';
import { Leaderboard } from '@/components/Leaderboard';

interface LevelSelectionProps {
  onLevelSelect: (level: number) => void;
}

export const LevelSelection = ({ onLevelSelect }: LevelSelectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <LevelButton
        level={1}
        title="The Basics"
        description="Master the fundamentals"
        points={100}
        onClick={() => onLevelSelect(1)}
      />
      <LevelButton
        level={2}
        title="Advanced Concepts"
        description="Dive deeper into complexity"
        points={200}
        onClick={() => onLevelSelect(2)}
        isLocked={true}
      />
      <LevelButton
        level={3}
        title="Expert Challenges"
        description="Test your mastery"
        points={300}
        onClick={() => onLevelSelect(3)}
        isLocked={true}
      />
      <div className="md:col-span-2 lg:col-span-3">
        <Leaderboard />
      </div>
    </div>
  );
};