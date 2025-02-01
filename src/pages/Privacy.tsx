import React from "react";
import { HomeLink } from "@/components/HomeLink";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate">
      <HomeLink />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gameGold text-center mb-8">
          Privacy Policy
        </h1>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <ScrollArea className="h-[70vh]">
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    Introduction
                  </h2>
                  <p className="text-gray-300">
                    Game of Sword Kings is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, and safeguard 
                    your personal information when you use our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    Information We Collect
                  </h2>
                  <div className="space-y-3 text-gray-300">
                    <p>We collect the following types of information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Account information (name, email, country)</li>
                      <li>Game progress and achievements</li>
                      <li>Quiz responses and scores</li>
                      <li>Usage statistics and preferences</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    How We Use Your Information
                  </h2>
                  <div className="space-y-3 text-gray-300">
                    <p>Your information is used to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Manage your account and track progress</li>
                      <li>Provide leaderboard rankings</li>
                      <li>Improve our services and user experience</li>
                      <li>Send important updates and notifications</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    Data Security
                  </h2>
                  <p className="text-gray-300">
                    We implement appropriate security measures to protect your 
                    personal information. Your data is encrypted and stored 
                    securely using industry-standard protocols.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    Your Rights
                  </h2>
                  <div className="space-y-3 text-gray-300">
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access your personal data</li>
                      <li>Request data correction or deletion</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Export your data</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    Contact Us
                  </h2>
                  <p className="text-gray-300">
                    If you have any questions about this Privacy Policy, please 
                    contact us at privacy@swordkings.com
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    Updates to This Policy
                  </h2>
                  <p className="text-gray-300">
                    We may update this Privacy Policy from time to time. We will 
                    notify you of any changes by posting the new Privacy Policy 
                    on this page and updating the "last updated" date.
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

export default Privacy;