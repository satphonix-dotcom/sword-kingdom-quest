import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export const HomeLink = () => {
  return (
    <Link 
      to="/" 
      className="absolute top-4 left-4 text-gameGold hover:text-gameGold/80 flex items-center gap-2"
    >
      <Home className="w-5 h-5" />
      <span>Return Home</span>
    </Link>
  );
};