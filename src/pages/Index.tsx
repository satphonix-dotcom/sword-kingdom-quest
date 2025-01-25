import React, { useState } from "react";
import { GameLogo } from "@/components/GameLogo";
import { LevelButton } from "@/components/LevelButton";
import { Leaderboard } from "@/components/Leaderboard";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate p-6">
      <div className="max-w-md mx-auto">
        <GameLogo />
        
        {!gameStarted ? (
          <div className="mt-8 animate-fade-in">
            <button
              onClick={() => setGameStarted(true)}
              className="w-full py-4 px-8 bg-gameGold text-gamePurple rounded-lg text-xl font-bold
                        hover:bg-opacity-90 transition-all duration-300 mb-8"
            >
              Start Game
            </button>
            <Leaderboard />
          </div>
        ) : (
          <div className="mt-8 space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Select Your Level
            </h2>
            <LevelButton
              level="Disciple"
              difficulty="Easy"
              onClick={() => console.log("Easy level selected")}
            />
            <LevelButton
              level="Prophet"
              difficulty="Medium"
              onClick={() => console.log("Medium level selected")}
              isLocked={true}
            />
            <LevelButton
              level="King"
              difficulty="Hard"
              onClick={() => console.log("Hard level selected")}
              isLocked={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;