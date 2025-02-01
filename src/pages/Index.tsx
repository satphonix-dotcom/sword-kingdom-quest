import React, { useState } from "react";
import { useGame } from "@/hooks/use-game";
import { HomeNavigation } from "@/components/home/HomeNavigation";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FeatureCards } from "@/components/home/FeatureCards";
import { HomeFooter } from "@/components/home/HomeFooter";
import { GameContent } from "@/components/home/GameContent";

const Index = () => {
  const { gameStarted, userId, handleLogout } = useGame();
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
        <div className="bg-gamePurple/50 py-2 text-center">
          <p className="text-gameGold text-sm">"...the sword of the Spirit, which is the word of God." Ephesians 6:17</p>
        </div>

        <HomeNavigation />
        <HeroBanner />
        <FeatureCards />
        <HomeFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate">
      <GameContent
        userId={userId}
        handleLogout={handleLogout}
        selectedLevel={selectedLevel}
        handleLevelSelect={handleLevelSelect}
        handleBackToLevels={handleBackToLevels}
      />
    </div>
  );
};

export default Index;