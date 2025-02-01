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

const StudyGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate">
      <HomeLink />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gameGold text-center mb-8">
          Study Guide
        </h1>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <ScrollArea className="h-[70vh]">
              <div className="space-y-6">
                <p className="text-gray-300">
                  Welcome to the Game of Sword Kings Study Guide. This comprehensive 
                  resource will help you prepare for the challenges ahead and deepen 
                  your biblical knowledge.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-gameGold">
                      Getting Started
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      Begin with Level 1 challenges to build a strong foundation. 
                      Each level progressively introduces more complex topics and 
                      requires deeper understanding of scripture.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-gameGold">
                      Study Tips
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Read the referenced scriptures in context</li>
                        <li>Take notes on key verses and themes</li>
                        <li>Review previous questions and answers</li>
                        <li>Practice with different translations</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-gameGold">
                      Topic Categories
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Old Testament History</li>
                        <li>New Testament Teachings</li>
                        <li>Prophetic Books</li>
                        <li>Wisdom Literature</li>
                        <li>Gospel Accounts</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-gameGold">
                      Advanced Strategies
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      For higher levels, focus on understanding theological concepts, 
                      historical context, and the interconnections between different 
                      parts of scripture. Time management becomes crucial in later 
                      challenges.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <section className="space-y-4 mt-8">
                  <h2 className="text-2xl font-semibold text-gameGold">
                    Additional Resources
                  </h2>
                  <p className="text-gray-300">
                    We recommend using these additional resources to enhance your 
                    study:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>Bible concordances</li>
                    <li>Biblical commentaries</li>
                    <li>Historical atlases</li>
                    <li>Original language dictionaries</li>
                  </ul>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyGuide;