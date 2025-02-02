import React from 'react';
import { Link } from 'react-router-dom';
import { UserMenuItems } from './UserMenuItems';

interface DesktopNavProps {
  user: any;
  userPoints: number;
  isAdmin: boolean;
  handleSignOut: () => void;
}

export const DesktopNav = ({ user, userPoints, isAdmin, handleSignOut }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center gap-8">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-gameGold hover:text-gameGold/80">Home</Link>
        <Link to="/leaderboard" className="text-gameGold hover:text-gameGold/80">Leaderboard</Link>
        <Link to="/about" className="text-gameGold hover:text-gameGold/80">About</Link>
        {user && <UserMenuItems userPoints={userPoints} isAdmin={isAdmin} />}
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
  );
};