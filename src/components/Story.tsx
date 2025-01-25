import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Story = () => (
  <Card className="w-full max-w-2xl mx-auto">
    <CardContent className="p-6">
      <ScrollArea className="h-[200px] w-full rounded-md">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gameGold">
            Welcome to the Quest for Knowledge!
          </h2>
          <p className="text-gray-300">
            In a world where wisdom is power, you find yourself at the beginning of
            an epic journey. As an aspiring scholar in the ancient Academy of
            Digital Arts and Sciences, you must prove your worth by conquering
            challenges that test both your wit and wisdom.
          </p>
          <p className="text-gray-300">
            Each level represents a new chapter in your quest, filled with
            questions that will challenge your understanding of various topics.
            Progress through the ranks, earn points, and compete with fellow
            scholars on the global leaderboard.
          </p>
          <p className="text-gray-300">
            Are you ready to begin your journey towards becoming a Master of
            Knowledge?
          </p>
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
);