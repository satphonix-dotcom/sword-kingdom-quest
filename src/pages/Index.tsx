import React, { useState } from "react";
import { GameLogo } from "@/components/GameLogo";
import { LevelButton } from "@/components/LevelButton";
import { Leaderboard } from "@/components/Leaderboard";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate p-6">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center">
          <GameLogo />
          <Button
            variant="ghost"
            className="text-gameGold hover:text-gameGold/80"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        
        {!gameStarted ? (
          <div className="mt-8 animate-fade-in">
            <button
              onClick={() => setGameStarted(true)}
              className="w-full py-4 px-8 bg-gameGold text-gamePurple rounded-lg text-xl font-bold
                        hover:bg-opacity-90 transition-all duration-300 mb-8"
            >
              Start Game
            </button>
            <Leaderboard />
          </div>
        ) : (
          <div className="mt-8 space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Select Your Level
            </h2>
            <LevelButton
              level="Disciple"
              difficulty="Easy"
              onClick={() => console.log("Easy level selected")}
            />
            <LevelButton
              level="Prophet"
              difficulty="Medium"
              onClick={() => console.log("Medium level selected")}
              isLocked={true}
            />
            <LevelButton
              level="King"
              difficulty="Hard"
              onClick={() => console.log("Hard level selected")}
              isLocked={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;