import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export const HeroBanner = () => {
  const [user, setUser] = React.useState<any>(null);

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

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
      <h2 className="text-gameGold text-6xl font-bold mb-6">Journey Through the Kingdom</h2>
      <p className="text-gray-300 text-xl max-w-3xl mb-8">
        Test your combat skills, compete with others, and master the art of warfare through our engaging quest system.
      </p>
      <div className="flex gap-4 justify-center">
        <Link 
          to={user ? "/levels" : "/auth"} 
          className="bg-gameGold text-gamePurple px-8 py-3 rounded-md font-semibold text-lg hover:bg-gameGold/90 transition-colors"
        >
          {user ? "Start Your Quest" : "Sign Up Now"}
        </Link>
        <Link to="/learn-more">
          <Button variant="outline" className="text-gameGold border-gameGold hover:bg-gameGold/10">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
};