import React from 'react';
import { Book, Trophy, Users } from 'lucide-react';

const features = [
  {
    icon: Book,
    title: "Biblical Knowledge",
    description: "Explore scripture through carefully crafted questions spanning both Old and New Testaments."
  },
  {
    icon: Trophy,
    title: "Earn Rewards",
    description: "Gain points and achievements as you progress through different difficulty levels."
  },
  {
    icon: Users,
    title: "Community",
    description: "Compete with other believers worldwide and see where you rank on our global leaderboard."
  }
];

export const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
      {features.map((feature) => (
        <div key={feature.title} className="bg-gamePurple/40 p-8 rounded-lg text-center">
          <feature.icon className="w-12 h-12 text-gameGold mx-auto mb-4" />
          <h3 className="text-gameGold text-xl font-semibold mb-3">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};