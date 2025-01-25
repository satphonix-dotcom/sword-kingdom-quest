import React, { useState, useEffect } from "react";
import { GameLogo } from "@/components/GameLogo";
import { LevelButton } from "@/components/LevelButton";
import { Leaderboard } from "@/components/Leaderboard";
import { UserDashboard } from "@/components/UserDashboard";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogOut, Scroll, Crown, Sword, Shield } from "lucide-react";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
    setUserId(null);
  };

  const Story = () => (
    <div className="space-y-6 text-center max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-gameGold mb-4">The Legend of Nirvana Paradiso</h2>
      <p className="text-white/90 leading-relaxed">
        In the celestial realm of Nirvana Paradiso, where the skies shimmer with eternal light,
        The Father of Thousands sends his children on sacred pilgrimages. Armed with a Bag of Swords
        and guided by the Great Spirit, they must face serpents, dragons, and unimaginable challenges.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <FeatureCard
          icon={<Sword className="w-8 h-8 text-gameGold" />}
          title="Sacred Weapons"
          description="Wield mystical swords and learn their ancient powers"
        />
        <FeatureCard
          icon={<Crown className="w-8 h-8 text-gameGold" />}
          title="Divine Crown"
          description="Earn your golden crown and return to glory"
        />
        <FeatureCard
          icon={<Shield className="w-8 h-8 text-gameGold" />}
          title="Holy Protection"
          description="Gather special fruits for strength and wisdom"
        />
      </div>
    </div>
  );

  const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="p-6 rounded-lg bg-gamePurple/30 backdrop-blur-sm border border-gameGold/20 hover:border-gameGold/40 transition-all duration-300">
      <div className="flex flex-col items-center space-y-3">
        {icon}
        <h3 className="text-lg font-semibold text-gameGold">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/514b8838-f7f8-4938-adc6-12e45621f17f.png')] opacity-10 bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-gamePurple/80 to-gameSlate/90" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
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
          <div className="space-y-12">
            <Story />
            {userId && <UserDashboard userId={userId} />}
            <div className="flex flex-col items-center space-y-8 animate-fade-in">
              <Button
                onClick={() => setGameStarted(true)}
                className="bg-gameGold hover:bg-gameGold/90 text-gamePurple px-8 py-6 text-xl font-bold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              >
                <Scroll className="mr-2 h-5 w-5" />
                Begin Your Journey
              </Button>
              <Leaderboard />
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-4 animate-fade-in max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gameGold mb-6 text-center">
              Choose Your Path
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