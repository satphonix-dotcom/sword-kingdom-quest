import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Volume2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const HomeNavigation = () => {
  const [user, setUser] = React.useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  React.useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Signed out successfully",
        description: "Come back soon!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Please try again.",
      });
    }
  };

  return (
    <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img
          src="/lovable-uploads/f77ed799-492e-4d30-a56c-591a8e002821.png"
          alt="Game Logo"
          className="w-12 h-12"
        />
        <h1 className="text-gameGold text-2xl font-bold">Game of Sword Kings</h1>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gameGold hover:text-gameGold/80">Home</Link>
          <Link to="/leaderboard" className="text-gameGold hover:text-gameGold/80">Leaderboard</Link>
          <Link to="/about" className="text-gameGold hover:text-gameGold/80">About</Link>
        </div>
        <div className="flex items-center gap-4">
          <Volume2 className="text-gameGold w-6 h-6" />
          <div className="w-24 h-1 bg-gameGold/30 rounded-full">
            <div className="w-1/2 h-full bg-gameGold rounded-full"></div>
          </div>
        </div>
        {user ? (
          <button 
            onClick={handleSignOut}
            className="bg-gameGold text-gamePurple px-6 py-2 rounded-md font-semibold hover:bg-gameGold/90 transition-colors"
          >
            Sign Out
          </button>
        ) : (
          <Link 
            to="/auth" 
            className="bg-gameGold text-gamePurple px-6 py-2 rounded-md font-semibold hover:bg-gameGold/90 transition-colors"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};