import React from "react";

export const GameLogo = () => {
  return (
    <div className="flex flex-col items-center animate-fade-in">
      <img
        src="/lovable-uploads/514b8838-f7f8-4938-adc6-12e45621f17f.png"
        alt="Game of Sword Kings Logo"
        className="w-32 h-32 mb-4"
      />
      <h1 className="text-3xl font-bold text-gameGold text-center">
        Game of Sword Kings
      </h1>
    </div>
  );
};