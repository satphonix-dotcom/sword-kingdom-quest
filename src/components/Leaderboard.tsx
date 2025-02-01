import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  country: string;
}

export const Leaderboard = () => {
  const { data: leaderboardData, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, points, country, first_name, last_name")
        .order("points", { ascending: false })
        .limit(10);

      if (error) throw error;

      return data.map((entry, index) => ({
        rank: index + 1,
        name: entry.first_name && entry.last_name
          ? `${entry.first_name} ${entry.last_name}`
          : entry.username || "Anonymous",
        score: entry.points,
        country: entry.country || "Unknown",
      }));
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gameGold mb-4 text-center">
        Global Leaderboard
      </h2>
      <div className="space-y-2">
        {leaderboardData?.map((entry) => (
          <div
            key={entry.rank}
            className="flex items-center justify-between p-3 bg-gamePurple/50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-gameGold font-bold">{entry.rank}</span>
              <div className="flex flex-col">
                <span className="text-white">{entry.name}</span>
                <span className="text-sm text-gray-300">{entry.country}</span>
              </div>
            </div>
            <span className="text-gameGold font-bold">{entry.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};