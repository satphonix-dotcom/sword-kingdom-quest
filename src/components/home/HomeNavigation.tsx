import React from 'react';
import { Link } from 'react-router-dom';
import { Volume2 } from 'lucide-react';

export const HomeNavigation = () => {
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
        <Link 
          to="/auth" 
          className="bg-gameGold text-gamePurple px-6 py-2 rounded-md font-semibold hover:bg-gameGold/90 transition-colors"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};