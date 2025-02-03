import React from "react";
import { HomeLink } from "@/components/HomeLink";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate">
      <HomeLink />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gameGold text-center mb-8">
          Terms and Conditions
        </h1>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <ScrollArea className="h-[70vh]">
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-gray-300">
                    By accessing and using Game of Sword Kings, you agree to be bound by these Terms and Conditions. 
                    If you do not agree with any part of these terms, you may not use our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    2. User Accounts
                  </h2>
                  <div className="space-y-3 text-gray-300">
                    <p>When creating an account, you agree to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide accurate and complete information</li>
                      <li>Maintain the security of your account credentials</li>
                      <li>Accept responsibility for all activities under your account</li>
                      <li>Notify us immediately of any unauthorized use</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    3. User Conduct
                  </h2>
                  <div className="space-y-3 text-gray-300">
                    <p>You agree not to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use the service for any unlawful purpose</li>
                      <li>Attempt to gain unauthorized access to any part of the service</li>
                      <li>Interfere with or disrupt the service</li>
                      <li>Share account credentials with others</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    4. Intellectual Property
                  </h2>
                  <p className="text-gray-300">
                    All content, features, and functionality of Game of Sword Kings are owned by us 
                    and are protected by international copyright, trademark, and other intellectual 
                    property laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    5. Game Rules and Fair Play
                  </h2>
                  <div className="space-y-3 text-gray-300">
                    <p>Players must:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Complete quizzes honestly and independently</li>
                      <li>Not use automated tools or cheats</li>
                      <li>Respect the learning process and other players</li>
                      <li>Not share quiz answers with others</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    6. Modifications to Service
                  </h2>
                  <p className="text-gray-300">
                    We reserve the right to modify or discontinue the service at any time, 
                    with or without notice. We shall not be liable to you or any third party 
                    for any modification, suspension, or discontinuance of the service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    7. Termination
                  </h2>
                  <p className="text-gray-300">
                    We may terminate or suspend your account and access to the service 
                    immediately, without prior notice or liability, for any reason, including 
                    breach of these Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gameGold mb-4">
                    8. Contact Information
                  </h2>
                  <p className="text-gray-300">
                    For any questions about these Terms, please contact us at terms@gameofswordkings.com
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

export default Terms;