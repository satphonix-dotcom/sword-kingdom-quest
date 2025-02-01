import React from "react";
import { HomeLink } from "@/components/HomeLink";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Sword, Shield, Crown, Book, Trophy, Users } from "lucide-react";

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate">
      <HomeLink />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gameGold text-center mb-8">
          About Game of Sword Kings
        </h1>
        
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <ScrollArea className="h-[70vh]">
              <div className="space-y-8">
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gameGold">Welcome to the Kingdom</h2>
                  <p className="text-gray-300">
                    Game of Sword Kings is an immersive biblical knowledge quest that combines 
                    the excitement of gaming with the wisdom of scripture. Step into a world where 
                    knowledge is your sword and understanding your shield.
                  </p>
                </section>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gamePurple/20 p-6 rounded-lg">
                    <Sword className="w-12 h-12 text-gameGold mb-4" />
                    <h3 className="text-xl font-semibold text-gameGold mb-2">
                      Battle with Knowledge
                    </h3>
                    <p className="text-gray-300">
                      Face challenging questions that test your understanding of scripture 
                      and biblical history.
                    </p>
                  </div>

                  <div className="bg-gamePurple/20 p-6 rounded-lg">
                    <Shield className="w-12 h-12 text-gameGold mb-4" />
                    <h3 className="text-xl font-semibold text-gameGold mb-2">
                      Defend Your Faith
                    </h3>
                    <p className="text-gray-300">
                      Build a strong foundation of biblical knowledge to strengthen 
                      your spiritual journey.
                    </p>
                  </div>

                  <div className="bg-gamePurple/20 p-6 rounded-lg">
                    <Crown className="w-12 h-12 text-gameGold mb-4" />
                    <h3 className="text-xl font-semibold text-gameGold mb-2">
                      Rise to Glory
                    </h3>
                    <p className="text-gray-300">
                      Progress through levels, earn achievements, and climb the 
                      ranks to become a true Sword King.
                    </p>
                  </div>
                </div>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gameGold">How It Works</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Book className="w-6 h-6 text-gameGold flex-shrink-0 mt-1" />
                        <p className="text-gray-300">
                          Complete quizzes covering various biblical topics and 
                          difficulty levels
                        </p>
                      </div>
                      <div className="flex items-start gap-4">
                        <Trophy className="w-6 h-6 text-gameGold flex-shrink-0 mt-1" />
                        <p className="text-gray-300">
                          Earn points and unlock achievements as you progress
                        </p>
                      </div>
                      <div className="flex items-start gap-4">
                        <Users className="w-6 h-6 text-gameGold flex-shrink-0 mt-1" />
                        <p className="text-gray-300">
                          Compete with other believers worldwide on our leaderboard
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gameGold">Ready to Begin?</h2>
                  <p className="text-gray-300">
                    Join our growing community of believers who are strengthening their faith 
                    through engaging biblical challenges. Start your journey today and become 
                    a master of scripture!
                  </p>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearnMore;