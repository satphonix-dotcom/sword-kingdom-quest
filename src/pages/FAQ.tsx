import React from "react";
import { HomeLink } from "@/components/HomeLink";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate">
      <HomeLink />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gameGold text-center mb-8">
          Frequently Asked Questions
        </h1>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <ScrollArea className="h-[70vh]">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-gameGold">
                    How do I get started?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Simply create an account and start with Level 1. The game will 
                    guide you through progressively challenging questions as you advance.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-gameGold">
                    How does the points system work?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Points are awarded based on correct answers and completion time. 
                    Higher levels offer more points, and consecutive correct answers 
                    can earn bonus points.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-gameGold">
                    Can I play without an account?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    While you can view the homepage without an account, you'll need 
                    to sign up to track your progress, earn points, and compete on 
                    the leaderboard.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-gameGold">
                    How do I unlock new levels?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Levels are unlocked by achieving a minimum score in the previous 
                    level. Keep practicing and improving your knowledge to advance.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-gameGold">
                    Is there a time limit for questions?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Yes, each quiz has a time limit. The timer is displayed during 
                    the quiz, and managing your time effectively is part of the challenge.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-gameGold">
                    How can I improve my ranking?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Focus on accuracy and speed, study the provided resources, and 
                    regularly practice. The more you play, the better you'll become.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;