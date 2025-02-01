import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { GameLogo } from '@/components/GameLogo';
import { LevelContent } from '@/components/LevelContent';
import { LevelSelection } from './LevelSelection';

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
          <LevelSelection onLevelSelect={handleLevelSelect} />
        )}
      </div>
    </div>
  );
};