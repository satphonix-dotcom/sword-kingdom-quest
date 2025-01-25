import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User, Star, Award, Edit2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditProfileForm } from "./EditProfileForm";

interface Profile {
  username: string;
  points: number;
  id: string;
  country: string | null;
  first_name: string | null;
  last_name: string | null;
}

export const UserDashboard = ({ userId }: { userId: string }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: profile, isLoading: profileLoading, refetch: refetchProfile } = useQuery({
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

  if (isEditing && profile) {
    return (
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <EditProfileForm
            profile={profile}
            userId={userId}
            onSuccess={() => {
              setIsEditing(false);
              refetchProfile();
            }}
            onCancel={() => setIsEditing(false)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => setIsEditing(true)}
          variant="outline"
          className="bg-white/20 hover:bg-white/30 text-white border-white/30"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile?.username}</div>
            <CardDescription>
              {profile?.country ? `From ${profile.country}` : "Your game profile"}
            </CardDescription>
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
    </div>
  );
};