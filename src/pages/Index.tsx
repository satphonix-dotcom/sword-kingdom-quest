import React, { useState } from "react";
import { GameLogo } from "@/components/GameLogo";
import { LevelButton } from "@/components/LevelButton";
import { Leaderboard } from "@/components/Leaderboard";
import { UserDashboard } from "@/components/UserDashboard";
import { Story } from "@/components/Story";
import { Button } from "@/components/ui/button";
import { ArrowRight, Volume2, LogOut, Book, Trophy, Users, Facebook, Twitter, Instagram, Mail } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate">
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
              className="bg-gameGold text-gamePurple px-6 py-2 rounded-md font-semibold hover:bg-gameGold/90 transition-colors"
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
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="bg-gamePurple/40 p-8 rounded-lg text-center">
              <Book className="w-12 h-12 text-gameGold mx-auto mb-4" />
              <h3 className="text-gameGold text-xl font-semibold mb-3">Biblical Knowledge</h3>
              <p className="text-gray-300">
                Explore scripture through carefully crafted questions spanning both Old and New Testaments.
              </p>
            </div>
            <div className="bg-gamePurple/40 p-8 rounded-lg text-center">
              <Trophy className="w-12 h-12 text-gameGold mx-auto mb-4" />
              <h3 className="text-gameGold text-xl font-semibold mb-3">Earn Rewards</h3>
              <p className="text-gray-300">
                Gain points and achievements as you progress through different difficulty levels.
              </p>
            </div>
            <div className="bg-gamePurple/40 p-8 rounded-lg text-center">
              <Users className="w-12 h-12 text-gameGold mx-auto mb-4" />
              <h3 className="text-gameGold text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-300">
                Compete with other believers worldwide and see where you rank on our global leaderboard.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-16">
            <h2 className="text-gameGold text-4xl font-bold mb-4">Ready to Begin Your Biblical Journey?</h2>
            <p className="text-gray-300 mb-8">Create an account to track your progress and compete with others.</p>
            <div className="flex gap-4 justify-center">
              <Link 
                to="/auth" 
                className="bg-gameGold text-gamePurple px-8 py-3 rounded-md font-semibold text-lg hover:bg-gameGold/90 transition-colors"
              >
                Sign Up Now
              </Link>
              <Button variant="outline" className="text-gameGold border-gameGold hover:bg-gameGold/10">
                Learn More
              </Button>
            </div>
          </div>

          {/* Footer */}
          <footer className="w-full bg-gamePurple/30 mt-auto">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="text-gameGold font-semibold mb-4">Game of Sword Kings</h3>
                  <p className="text-gray-300">
                    Embark on an epic journey, test your skills, and become a legendary warrior.
                  </p>
                </div>
                <div>
                  <h3 className="text-gameGold font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><Link to="/" className="text-gray-300 hover:text-gameGold">Home</Link></li>
                    <li><Link to="/" className="text-gray-300 hover:text-gameGold">Leaderboard</Link></li>
                    <li><Link to="/" className="text-gray-300 hover:text-gameGold">About</Link></li>
                    <li><Link to="/" className="text-gray-300 hover:text-gameGold">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-gameGold font-semibold mb-4">Resources</h3>
                  <ul className="space-y-2">
                    <li><Link to="/" className="text-gray-300 hover:text-gameGold">Study Guide</Link></li>
                    <li><Link to="/" className="text-gray-300 hover:text-gameGold">FAQ</Link></li>
                    <li><Link to="/" className="text-gray-300 hover:text-gameGold">Support</Link></li>
                    <li><Link to="/" className="text-gray-300 hover:text-gameGold">Privacy Policy</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-gameGold font-semibold mb-4">Connect With Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="text-gray-300 hover:text-gameGold"><Facebook className="w-6 h-6" /></a>
                    <a href="#" className="text-gray-300 hover:text-gameGold"><Twitter className="w-6 h-6" /></a>
                    <a href="#" className="text-gray-300 hover:text-gameGold"><Instagram className="w-6 h-6" /></a>
                    <a href="#" className="text-gray-300 hover:text-gameGold"><Mail className="w-6 h-6" /></a>
                  </div>
                </div>
              </div>
              <div className="text-center pt-8 border-t border-gray-700">
                <p className="text-gray-400">© 2025 Game of Sword Kings. All rights reserved.</p>
              </div>
            </div>
          </footer>
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
    </div>
  );
};

export default Index;