import React from "react";
import { HomeLink } from "@/components/HomeLink";
import { Leaderboard } from "@/components/Leaderboard";

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate">
      <HomeLink />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gameGold text-center mb-12">
          Global Leaderboard
        </h1>
        <Leaderboard />
      </div>
    </div>
  );
};

export default LeaderboardPage;