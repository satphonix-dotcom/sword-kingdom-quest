import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Trophy } from 'lucide-react';

interface UserMenuItemsProps {
  userPoints: number;
  isAdmin: boolean;
  onCloseMenu?: () => void;
}

export const UserMenuItems = ({ userPoints, isAdmin, onCloseMenu }: UserMenuItemsProps) => {
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
        <span>{userPoints} points</span>
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