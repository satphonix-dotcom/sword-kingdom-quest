import React from "react";

interface LeaderboardEntryProps {
  rank: number;
  name: string;
  score: number;
  country: string;
}

export const LeaderboardEntry = ({ rank, name, score, country }: LeaderboardEntryProps) => {
  return (
    <div className="flex items-center justify-between p-2 md:p-3 bg-gamePurple/50 rounded-lg">
      <div className="flex items-center gap-2 md:gap-3">
        <span className="text-gameGold font-bold min-w-[24px] text-center">{rank}</span>
        <div className="flex flex-col">
          <span className="text-white text-sm md:text-base truncate max-w-[150px] md:max-w-[200px]">{name}</span>
          <span className="text-xs md:text-sm text-gray-300 truncate max-w-[150px] md:max-w-[200px]">{country}</span>
        </div>
      </div>
      <span className="text-gameGold font-bold text-sm md:text-base">{score}</span>
    </div>
  );
};