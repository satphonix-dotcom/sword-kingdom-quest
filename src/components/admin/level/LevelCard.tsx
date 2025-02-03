import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LevelCardProps {
  level: any;
  onEdit: (level: any) => void;
  onDelete: (id: string) => void;
}

export const LevelCard = ({ level, onEdit, onDelete }: LevelCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">
              Level {level.order_number}: {level.title}
            </h3>
            <p className="text-sm text-gray-500">{level.description}</p>
            <p className="text-sm text-gameGold">{level.points} points</p>
            <p className="text-sm text-gray-500">
              Status: {level.is_locked ? "🔒 Locked" : "🔓 Unlocked"}
            </p>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(level)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(level.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};