import React from "react";
import { GameLogo } from "@/components/GameLogo";
import { LevelButton } from "@/components/LevelButton";
import { Leaderboard } from "@/components/Leaderboard";
import { UserDashboard } from "@/components/UserDashboard";
import { Story } from "@/components/Story";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useGame } from "@/hooks/use-game";

const Index = () => {
  const { gameStarted, setGameStarted, userId, handleLogout } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate p-4">
      <div className="container mx-auto">
        {/* Header */}
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

        {/* Main Content */}
        <div className="max-w-6xl mx-auto space-y-8">
          {gameStarted ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <LevelButton
                level={1}
                title="The Basics"
                description="Master the fundamentals"
                points={100}
              />
              <LevelButton
                level={2}
                title="Advanced Concepts"
                description="Dive deeper into complexity"
                points={200}
              />
              <LevelButton
                level={3}
                title="Expert Challenges"
                description="Test your mastery"
                points={300}
              />
              <div className="md:col-span-2 lg:col-span-3">
                <Leaderboard />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <Story />
              {userId && <UserDashboard userId={userId} />}
              <div className="flex flex-col items-center space-y-4 animate-fade-in">
                <Button
                  onClick={() => setGameStarted(true)}
                  className="bg-gameGold text-gamePurple hover:bg-gameGold/90 text-lg px-8 py-4"
                >
                  Begin Your Quest
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;