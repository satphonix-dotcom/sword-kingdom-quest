import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LeaderboardEntry } from "./leaderboard/LeaderboardEntry";

interface LeaderboardData {
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
        score: entry.points || 0,
        country: entry.country || "Unknown",
      }));
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg p-4 md:p-6 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-gameGold mb-4 text-center">
        Global Leaderboard
      </h2>
      <div className="space-y-2">
        {leaderboardData?.map((entry: LeaderboardData) => (
          <LeaderboardEntry key={entry.rank} {...entry} />
        ))}
      </div>
    </div>
  );
};