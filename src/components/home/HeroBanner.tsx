import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const HeroBanner = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
      <h2 className="text-gameGold text-6xl font-bold mb-6">Journey Through the Kingdom</h2>
      <p className="text-gray-300 text-xl max-w-3xl mb-8">
        Test your combat skills, compete with others, and master the art of warfare through our engaging quest system.
      </p>
      <div className="flex gap-4 justify-center">
        <Link 
          to="/auth" 
          className="bg-gameGold text-gamePurple px-8 py-3 rounded-md font-semibold text-lg hover:bg-gameGold/90 transition-colors"
        >
          Sign Up Now
        </Link>
        <Button variant="outline" className="text-gameGold border-gameGold hover:bg-gameGold/10">
          Learn More
        </Button>
      </div>
    </div>
  );
};