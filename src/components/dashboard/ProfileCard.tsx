import { User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProfileCardProps {
  username: string;
  country: string | null;
}

export const ProfileCard = ({ username, country }: ProfileCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Profile</CardTitle>
        <User className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{username}</div>
        <CardDescription>
          {country ? `From ${country}` : "Your game profile"}
        </CardDescription>
      </CardContent>
    </Card>
  );
};