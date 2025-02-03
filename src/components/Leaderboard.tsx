import React from "react";
import { LeaderboardEntry } from "./leaderboard/LeaderboardEntry";
import { LeaderboardHeader } from "./leaderboard/LeaderboardHeader";
import { useLeaderboard } from "@/hooks/use-leaderboard";

export const Leaderboard = () => {
  const { leaderboardData, isLoading } = useLeaderboard();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg p-4 md:p-6 animate-fade-in">
      <LeaderboardHeader />
      <div className="space-y-2">
        {leaderboardData?.map((entry) => (
          <LeaderboardEntry key={entry.rank} {...entry} />
        ))}
      </div>
    </div>
  );
};