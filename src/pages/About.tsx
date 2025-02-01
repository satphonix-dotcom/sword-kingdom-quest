import React from "react";
import { HomeLink } from "@/components/HomeLink";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Trophy, Users } from "lucide-react";

const About = () => {
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
                  <h2 className="text-2xl font-semibold text-gameGold">Our Mission</h2>
                  <p className="text-gray-300">
                    Game of Sword Kings is dedicated to making biblical learning engaging and 
                    interactive. We believe that understanding scripture should be both 
                    challenging and rewarding, combining modern gaming elements with timeless wisdom.
                  </p>
                </section>

                <section className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gamePurple/20 p-6 rounded-lg">
                    <Book className="w-12 h-12 text-gameGold mb-4" />
                    <h3 className="text-xl font-semibold text-gameGold mb-2">
                      Biblical Knowledge
                    </h3>
                    <p className="text-gray-300">
                      Carefully crafted questions spanning both Old and New Testaments, 
                      designed to deepen your understanding of scripture.
                    </p>
                  </div>

                  <div className="bg-gamePurple/20 p-6 rounded-lg">
                    <Trophy className="w-12 h-12 text-gameGold mb-4" />
                    <h3 className="text-xl font-semibold text-gameGold mb-2">
                      Achievement System
                    </h3>
                    <p className="text-gray-300">
                      Earn points and unlock achievements as you progress through 
                      different levels of biblical knowledge.
                    </p>
                  </div>

                  <div className="bg-gamePurple/20 p-6 rounded-lg">
                    <Users className="w-12 h-12 text-gameGold mb-4" />
                    <h3 className="text-xl font-semibold text-gameGold mb-2">
                      Global Community
                    </h3>
                    <p className="text-gray-300">
                      Connect with believers worldwide, compete on the leaderboard, 
                      and share your journey of faith.
                    </p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gameGold">Our Story</h2>
                  <p className="text-gray-300">
                    Founded by a group of passionate believers and developers, Game of Sword Kings 
                    emerged from a desire to make biblical education more accessible and engaging 
                    for the digital age. Our team combines expertise in theology, education, and 
                    game design to create a unique learning experience.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gameGold">Join Our Journey</h2>
                  <p className="text-gray-300">
                    Whether you're a biblical scholar or just beginning your journey of faith, 
                    Game of Sword Kings offers a path to deeper understanding through interactive 
                    learning. Join our growing community and start your quest for knowledge today.
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

export default About;