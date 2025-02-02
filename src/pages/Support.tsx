import React from "react";
import { HomeLink } from "@/components/HomeLink";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/support/ContactForm";
import { ContactInfo } from "@/components/support/ContactInfo";
import { QuickHelp } from "@/components/support/QuickHelp";

const Support = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate">
      <HomeLink />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gameGold text-center mb-8">
          Support Center
        </h1>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-gameGold mb-6">
                Contact Us
              </h2>
              <ContactForm />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gameGold mb-4">
                  Other Ways to Reach Us
                </h2>
                <ContactInfo />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gameGold mb-4">
                  Quick Help
                </h2>
                <QuickHelp />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;