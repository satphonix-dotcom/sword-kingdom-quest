import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { GameLogo } from '@/components/GameLogo';
import { LevelButton } from '@/components/LevelButton';
import { Leaderboard } from '@/components/Leaderboard';
import { LevelContent } from '@/components/LevelContent';

interface GameContentProps {
  userId: string | null;
  handleLogout: () => void;
  selectedLevel: number | null;
  handleLevelSelect: (level: number) => void;
  handleBackToLevels: () => void;
}

export const GameContent = ({
  userId,
  handleLogout,
  selectedLevel,
  handleLevelSelect,
  handleBackToLevels,
}: GameContentProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <GameLogo className="w-48" />
        {userId && (
          <Button
            variant="ghost"
            className="text-gameGold hover:text-gameGold/80"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        )}
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {selectedLevel ? (
          <LevelContent 
            level={selectedLevel} 
            onBack={handleBackToLevels}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LevelButton
              level={1}
              title="The Basics"
              description="Master the fundamentals"
              points={100}
              onClick={() => handleLevelSelect(1)}
            />
            <LevelButton
              level={2}
              title="Advanced Concepts"
              description="Dive deeper into complexity"
              points={200}
              onClick={() => handleLevelSelect(2)}
              isLocked={true}
            />
            <LevelButton
              level={3}
              title="Expert Challenges"
              description="Test your mastery"
              points={300}
              onClick={() => handleLevelSelect(3)}
              isLocked={true}
            />
            <div className="md:col-span-2 lg:col-span-3">
              <Leaderboard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};