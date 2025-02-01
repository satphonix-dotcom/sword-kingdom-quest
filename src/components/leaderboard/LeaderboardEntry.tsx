import React from "react";

interface LeaderboardEntryProps {
  rank: number;
  name: string;
  score: number;
  country: string;
}

export const LeaderboardEntry = ({ rank, name, score, country }: LeaderboardEntryProps) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gamePurple/50 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-gameGold font-bold">{rank}</span>
        <div className="flex flex-col">
          <span className="text-white">{name}</span>
          <span className="text-sm text-gray-300">{country}</span>
        </div>
      </div>
      <span className="text-gameGold font-bold">{score}</span>
    </div>
  );
};