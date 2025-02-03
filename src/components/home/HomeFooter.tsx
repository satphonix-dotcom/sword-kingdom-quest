import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export const HomeFooter = () => {
  return (
    <footer className="w-full bg-gamePurple/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-gameGold font-semibold mb-4">Game of Sword Kings</h3>
            <p className="text-gray-300">
              Embark on an epic journey, test your skills, and become a legendary warrior.
            </p>
          </div>
          <div>
            <h3 className="text-gameGold font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-gameGold">Home</Link></li>
              <li><Link to="/leaderboard" className="text-gray-300 hover:text-gameGold">Leaderboard</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-gameGold">About</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-gameGold">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gameGold font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/study-guide" className="text-gray-300 hover:text-gameGold">Study Guide</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-gameGold">FAQ</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-gameGold">Support</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-gameGold">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-gameGold">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gameGold font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-gameGold"><Facebook className="w-6 h-6" /></a>
              <a href="#" className="text-gray-300 hover:text-gameGold"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="text-gray-300 hover:text-gameGold"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="text-gray-300 hover:text-gameGold"><Mail className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-gray-700">
          <p className="text-gray-400">© 2025 Game of Sword Kings. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};