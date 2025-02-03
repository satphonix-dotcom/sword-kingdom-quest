import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  country: string;
}

export const useLeaderboard = (countryFilter?: string) => {
  const { toast } = useToast();

  const { data: leaderboardData, isLoading, refetch } = useQuery({
    queryKey: ["leaderboard", countryFilter],
    queryFn: async () => {
      console.log("Fetching leaderboard data...");
      let query = supabase
        .from("profiles")
        .select("username, points, country, first_name, last_name")
        .gt('points', 0)
        .order("points", { ascending: false })
        .limit(10);

      if (countryFilter) {
        query = query.eq('country', countryFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching leaderboard data:", error);
        throw error;
      }

      console.log("Received raw leaderboard data:", data);
      const transformedData = data.map((entry, index) => {
        console.log("Processing entry:", entry);

        let displayName = "";
        if (entry.first_name || entry.last_name) {
          displayName = [entry.first_name, entry.last_name]
            .filter(Boolean)
            .join(" ")
            .trim();
        } else {
          displayName = "Anonymous";
          console.log("No name found for entry, using Anonymous:", entry);
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

  return { leaderboardData, isLoading };
};