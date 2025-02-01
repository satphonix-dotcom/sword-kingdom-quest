import React, { useState } from "react";
import { GameLogo } from "@/components/GameLogo";
import { LevelButton } from "@/components/LevelButton";
import { Leaderboard } from "@/components/Leaderboard";
import { UserDashboard } from "@/components/UserDashboard";
import { Story } from "@/components/Story";
import { Button } from "@/components/ui/button";
import { ArrowRight, Volume2, LogOut } from "lucide-react";
import { useGame } from "@/hooks/use-game";
import { useToast } from "@/hooks/use-toast";
import { LevelContent } from "@/components/LevelContent";
import { Link } from "react-router-dom";

const Index = () => {
  const { gameStarted, setGameStarted, userId, handleLogout } = useGame();
  const { toast } = useToast();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level);
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate flex flex-col">
        {/* Bible Verse Banner */}
        <div className="bg-gamePurple/50 py-2 text-center">
          <p className="text-gameGold text-sm">"...the sword of the Spirit, which is the word of God." Ephesians 6:17</p>
        </div>

        {/* Navigation */}
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src="/lovable-uploads/f77ed799-492e-4d30-a56c-591a8e002821.png"
              alt="Game Logo"
              className="w-12 h-12"
            />
            <h1 className="text-gameGold text-2xl font-bold">Game of Sword Kings</h1>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-gameGold hover:text-gameGold/80">Home</Link>
              <Link to="/" className="text-gameGold hover:text-gameGold/80">Leaderboard</Link>
              <Link to="/" className="text-gameGold hover:text-gameGold/80">About</Link>
            </div>
            <div className="flex items-center gap-4">
              <Volume2 className="text-gameGold w-6 h-6" />
              <div className="w-24 h-1 bg-gameGold/30 rounded-full">
                <div className="w-1/2 h-full bg-gameGold rounded-full"></div>
              </div>
            </div>
            <Link 
              to="/auth" 
              className="bg-yellow-400 text-gamePurple px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
          <h2 className="text-gameGold text-6xl font-bold mb-6">Journey Through the Kingdom</h2>
          <p className="text-gray-300 text-xl max-w-3xl mb-8">
            Test your combat skills, compete with others, and master the art of warfare through our engaging quest system.
          </p>
          <Link 
            to="/auth" 
            className="bg-yellow-400 text-gamePurple px-8 py-3 rounded-md font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center gap-2"
          >
            Sign In to Begin
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-400 mt-4">
            You must be signed in to start your warrior journey
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate">
      <div className="container mx-auto px-4 py-8">
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
            selectedLevel ? (
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
            )
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
