import React from "react";

export const GameLogo = () => {
  return (
    <div className="flex flex-col items-center animate-fade-in">
      <img
        src="/lovable-uploads/f77ed799-492e-4d30-a56c-591a8e002821.png"
        alt="Game of Sword Kings Logo"
        className="w-32 h-32 mb-4 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] filter-none"
        style={{
          filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.7))",
        }}
      />
      <h1 className="text-3xl font-bold text-gameGold text-center drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">
        Game of Sword Kings
      </h1>
    </div>
  );
};