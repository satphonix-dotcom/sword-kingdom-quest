import { ProfileCard } from "./ProfileCard";
import { PointsCard } from "./PointsCard";
import { RankCard } from "./RankCard";

interface Profile {
  username: string;
  points: number;
  country: string | null;
}

interface DashboardStatsProps {
  profile: Profile;
  leaderboardPosition: number;
}

export const DashboardStats = ({
  profile,
  leaderboardPosition,
}: DashboardStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <ProfileCard username={profile.username} country={profile.country} />
      <PointsCard points={profile.points} />
      <RankCard position={leaderboardPosition} />
    </div>
  );
};