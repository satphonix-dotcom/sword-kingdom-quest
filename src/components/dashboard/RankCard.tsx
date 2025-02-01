import { Award } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RankCardProps {
  position: number;
}

export const RankCard = ({ position }: RankCardProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gameGold">Global Rank</CardTitle>
        <Award className="h-4 w-4 text-gameGold" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">#{position}</div>
        <CardDescription className="text-gray-300">
          Your position on the leaderboard
        </CardDescription>
      </CardContent>
    </Card>
  );
};