import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export const HomeNavigation = () => {
  const [user, setUser] = React.useState<any>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [userPoints, setUserPoints] = React.useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
        fetchUserPoints(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
        fetchUserPoints(session.user.id);
      } else {
        setIsAdmin(false);
        setUserPoints(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserPoints = async (userId: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('points')
      .eq('id', userId)
      .single();
    
    setUserPoints(profile?.points || 0);
  };

  const checkAdminStatus = async (userId: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();
    
    setIsAdmin(profile?.is_admin || false);
  };

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src="/lovable-uploads/f77ed799-492e-4d30-a56c-591a8e002821.png"
            alt="Game Logo"
            className="w-12 h-12"
          />
          <h1 className="text-gameGold text-xl md:text-2xl font-bold">Game of Sword Kings</h1>
        </div>

        <DesktopNav 
          user={user}
          userPoints={userPoints}
          isAdmin={isAdmin}
          handleSignOut={handleSignOut}
        />

        <MobileNav 
          user={user}
          userPoints={userPoints}
          isAdmin={isAdmin}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          closeMenu={closeMenu}
          handleSignOut={handleSignOut}
        />
      </div>
    </nav>
  );
};