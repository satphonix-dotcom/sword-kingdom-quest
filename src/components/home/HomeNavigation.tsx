import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserCircle, Menu, X } from 'lucide-react';

export const HomeNavigation = () => {
  const [user, setUser] = React.useState<any>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  React.useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
      {/* Logo and Title */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src="/lovable-uploads/f77ed799-492e-4d30-a56c-591a8e002821.png"
            alt="Game Logo"
            className="w-12 h-12"
          />
          <h1 className="text-gameGold text-xl md:text-2xl font-bold">Game of Sword Kings</h1>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-gameGold hover:text-gameGold/80"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gameGold hover:text-gameGold/80">Home</Link>
            <Link to="/leaderboard" className="text-gameGold hover:text-gameGold/80">Leaderboard</Link>
            <Link to="/about" className="text-gameGold hover:text-gameGold/80">About</Link>
            {user && (
              <Link 
                to="/profile" 
                className="text-gameGold hover:text-gameGold/80 flex items-center gap-2"
              >
                <UserCircle className="w-5 h-5" />
                <span>Profile</span>
              </Link>
            )}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="text-gameGold hover:text-gameGold/80"
              >
                Admin Panel
              </Link>
            )}
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
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-gamePurple/95 rounded-lg p-4 animate-fade-in">
          <div className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-gameGold hover:text-gameGold/80 py-2"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/leaderboard" 
              className="text-gameGold hover:text-gameGold/80 py-2"
              onClick={closeMenu}
            >
              Leaderboard
            </Link>
            <Link 
              to="/about" 
              className="text-gameGold hover:text-gameGold/80 py-2"
              onClick={closeMenu}
            >
              About
            </Link>
            {user && (
              <Link 
                to="/profile" 
                className="text-gameGold hover:text-gameGold/80 flex items-center gap-2 py-2"
                onClick={closeMenu}
              >
                <UserCircle className="w-5 h-5" />
                <span>Profile</span>
              </Link>
            )}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="text-gameGold hover:text-gameGold/80 py-2"
                onClick={closeMenu}
              >
                Admin Panel
              </Link>
            )}
            {user ? (
              <button 
                onClick={() => {
                  handleSignOut();
                  closeMenu();
                }}
                className="bg-gameGold text-gamePurple px-6 py-2 rounded-md font-semibold hover:bg-gameGold/90 transition-colors w-full mt-2"
              >
                Sign Out
              </button>
            ) : (
              <Link 
                to="/auth" 
                className="bg-gameGold text-gamePurple px-6 py-2 rounded-md font-semibold hover:bg-gameGold/90 transition-colors block text-center mt-2"
                onClick={closeMenu}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};