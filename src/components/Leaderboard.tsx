import React from "react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "David", score: 1000 },
  { rank: 2, name: "Solomon", score: 950 },
  { rank: 3, name: "Esther", score: 900 },
  { rank: 4, name: "Daniel", score: 850 },
  { rank: 5, name: "Ruth", score: 800 },
];

export const Leaderboard = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gameGold mb-4 text-center">
        Global Leaderboard
      </h2>
      <div className="space-y-2">
        {mockLeaderboard.map((entry) => (
          <div
            key={entry.rank}
            className="flex items-center justify-between p-3 bg-gamePurple/50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-gameGold font-bold">{entry.rank}</span>
              <span className="text-white">{entry.name}</span>
            </div>
            <span className="text-gameGold font-bold">{entry.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};