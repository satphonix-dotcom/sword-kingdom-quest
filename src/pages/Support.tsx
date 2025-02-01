import React from "react";
import { HomeLink } from "@/components/HomeLink";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Phone } from "lucide-react";

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
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <Input 
                    placeholder="Your name"
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <Input 
                    type="email"
                    placeholder="your@email.com"
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <Textarea 
                    placeholder="How can we help?"
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                    rows={4}
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gameGold mb-4">
                  Other Ways to Reach Us
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-gameGold w-5 h-5" />
                    <span className="text-gray-300">support@swordkings.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-gameGold w-5 h-5" />
                    <span className="text-gray-300">1-800-SWORD-KING</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="text-gameGold w-5 h-5" />
                    <span className="text-gray-300">Live Chat (9am-5pm EST)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gameGold mb-4">
                  Quick Help
                </h2>
                <ul className="space-y-2 text-gray-300">
                  <li>• Check our FAQ for common questions</li>
                  <li>• View the Study Guide for game tips</li>
                  <li>• Report technical issues</li>
                  <li>• Request feature improvements</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;