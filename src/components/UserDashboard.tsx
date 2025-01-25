import { useQuery } from "@tanstack/react-query";
import { User, Star, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Profile {
  username: string;
  points: number;
  id: string;
}

export const UserDashboard = ({ userId }: { userId: string }) => {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  const { data: leaderboardPosition, isLoading: rankLoading } = useQuery({
    queryKey: ["leaderboardPosition", userId],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("id")
        .order("points", { ascending: false });

      if (error) throw error;
      return profiles.findIndex((p) => p.id === userId) + 1;
    },
  });

  if (profileLoading || rankLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profile</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{profile?.username}</div>
          <CardDescription>Your game profile</CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Points</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{profile?.points}</div>
          <CardDescription>Total points earned</CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">#{leaderboardPosition}</div>
          <CardDescription>Your position on the leaderboard</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};