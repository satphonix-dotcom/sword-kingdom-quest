import { LevelButton } from "@/components/LevelButton";
import { Level } from "@/types/quiz";

interface LevelSelectionProps {
  levels: Level[] | undefined;
  onLevelClick: (levelNumber: number) => void;
}

export const LevelSelection = ({ levels, onLevelClick }: LevelSelectionProps) => {
  if (!levels?.length) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gameGold mb-8">
          Choose Your Challenge
        </h1>
        <p className="text-muted-foreground">No levels available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-gameGold mb-8 text-center">
        Choose Your Challenge
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level) => (
          <LevelButton
            key={level.id}
            level={level.order_number}
            title={level.title}
            description={level.description || ''}
            points={level.points}
            isLocked={level.is_locked || false}
            onClick={() => onLevelClick(level.order_number)}
          />
        ))}
      </div>
    </>
  );
};