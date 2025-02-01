import { LevelButton } from "@/components/LevelButton";

interface Level {
  id: string;
  order_number: number;
  title: string;
  description: string | null;
  points: number;
  is_locked: boolean;
}

interface LevelSelectionProps {
  levels: Level[] | undefined;
  onLevelClick: (levelNumber: number) => void;
}

export const LevelSelection = ({ levels, onLevelClick }: LevelSelectionProps) => {
  return (
    <>
      <h1 className="text-4xl font-bold text-gameGold mb-8 text-center">
        Choose Your Challenge
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels?.map((level) => (
          <LevelButton
            key={level.id}
            level={level.order_number}
            title={level.title}
            description={level.description || ''}
            points={level.points}
            isLocked={level.is_locked}
            onClick={() => onLevelClick(level.order_number)}
          />
        ))}
      </div>
    </>
  );
};