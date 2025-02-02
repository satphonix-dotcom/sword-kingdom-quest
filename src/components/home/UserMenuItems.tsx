import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Trophy } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface UserMenuItemsProps {
  userPoints: number;
  isAdmin: boolean;
  onCloseMenu?: () => void;
}

export const UserMenuItems = ({ userPoints: initialPoints, isAdmin, onCloseMenu }: UserMenuItemsProps) => {
  const [points, setPoints] = useState(initialPoints);

  useEffect(() => {
    setPoints(initialPoints);
  }, [initialPoints]);

  useEffect(() => {
    const setupSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log("No user found for points subscription");
        return;
      }
      
      console.log("Setting up points subscription for user:", user.id);
      
      const channel = supabase
        .channel('points-updates')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'profiles',
            filter: `id=eq.${user.id}`
          },
          (payload) => {
            console.log("Points update received:", payload);
            if (payload.new && 'points' in payload.new) {
              console.log("Updating points to:", payload.new.points);
              setPoints(payload.new.points);
            }
          }
        )
        .subscribe((status) => {
          console.log("Points subscription status:", status);
        });

      return () => {
        console.log("Cleaning up points subscription");
        supabase.removeChannel(channel);
      };
    };

    const cleanup = setupSubscription();
    return () => {
      cleanup.then(cleanupFn => cleanupFn && cleanupFn());
    };
  }, []);

  return (
    <>
      <Link 
        to="/profile" 
        className="text-gameGold hover:text-gameGold/80 flex items-center gap-2"
        onClick={onCloseMenu}
      >
        <UserCircle className="w-5 h-5" />
        <span>Profile</span>
      </Link>
      <div className="flex items-center gap-2 text-gameGold">
        <Trophy className="w-5 h-5" />
        <span>{points} points</span>
      </div>
      {isAdmin && (
        <Link 
          to="/admin" 
          className="text-gameGold hover:text-gameGold/80"
          onClick={onCloseMenu}
        >
          Admin Panel
        </Link>
      )}
    </>
  );
};