import React from "react";
import { cn } from "@/lib/utils";

interface LevelButtonProps {
  level: number | string;
  title: string;
  description: string;
  points: number;
  onClick?: () => void;
  isLocked?: boolean;
}

export const LevelButton = ({ 
  level, 
  title,
  description,
  points,
  onClick, 
  isLocked = false 
}: LevelButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        "relative w-full p-4 mb-4 rounded-lg transition-all duration-300",
        "bg-gradient-to-r from-gamePurple to-gameSlate",
        "hover:shadow-lg hover:scale-105",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "text-white text-left"
      )}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">Level {level}</h3>
          <p className="text-sm text-gameGold">{title}</p>
          <p className="text-xs text-gray-300">{description}</p>
          <p className="text-xs text-gameGold mt-1">{points} points</p>
        </div>
        {isLocked && (
          <span className="text-2xl">🔒</span>
        )}
      </div>
    </button>
  );
};