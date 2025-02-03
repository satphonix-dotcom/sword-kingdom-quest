import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LeaderboardEntry } from "./leaderboard/LeaderboardEntry";
import { useToast } from "@/hooks/use-toast";

interface LeaderboardData {
  rank: number;
  name: string;
  score: number;
  country: string;
}

export const Leaderboard = () => {
  const { toast } = useToast();
  const { data: leaderboardData, isLoading, refetch } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      console.log("Fetching leaderboard data...");
      const { data, error } = await supabase
        .from("profiles")
        .select("username, points, country, first_name, last_name")
        .order("points", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching leaderboard data:", error);
        throw error;
      }

      console.log("Received raw leaderboard data:", data);
      const transformedData = data.map((entry, index) => {
        // First try to use first_name + last_name
        let displayName = "";
        if (entry.first_name && entry.last_name) {
          displayName = `${entry.first_name} ${entry.last_name}`;
        } else if (entry.first_name) {
          displayName = entry.first_name;
        } else if (entry.last_name) {
          displayName = entry.last_name;
        } else if (entry.username && !entry.username.includes('@')) {
          // Only use username if it's not an email address
          displayName = entry.username;
        } else {
          displayName = "Anonymous";
        }

        return {
          rank: index + 1,
          name: displayName,
          score: entry.points || 0,
          country: entry.country || "Unknown",
        };
      });
      console.log("Transformed leaderboard data:", transformedData);
      return transformedData;
    },
  });

  useEffect(() => {
    console.log("Setting up real-time subscription...");
    const channel = supabase
      .channel('points_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
        },
        (payload) => {
          console.log("Received real-time update payload:", payload);
          refetch();
          toast({
            title: "Leaderboard Updated",
            description: "The scores have been updated.",
          });
        }
      )
      .subscribe((status) => {
        console.log("Points subscription status:", status);
      });

    return () => {
      console.log("Cleaning up real-time subscription...");
      supabase.removeChannel(channel);
    };
  }, [refetch, toast]);

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