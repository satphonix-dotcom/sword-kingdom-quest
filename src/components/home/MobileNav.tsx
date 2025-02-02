import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { UserMenuItems } from './UserMenuItems';

interface MobileNavProps {
  user: any;
  userPoints: number;
  isAdmin: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  handleSignOut: () => void;
}

export const MobileNav = ({ 
  user, 
  userPoints, 
  isAdmin, 
  isMenuOpen, 
  toggleMenu, 
  closeMenu, 
  handleSignOut 
}: MobileNavProps) => {
  return (
    <>
      <button
        className="md:hidden text-gameGold hover:text-gameGold/80"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

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
              <UserMenuItems 
                userPoints={userPoints} 
                isAdmin={isAdmin} 
                onCloseMenu={closeMenu} 
              />
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
    </>
  );
};