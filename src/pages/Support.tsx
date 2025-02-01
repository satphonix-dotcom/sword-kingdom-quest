import React from "react";
import { HomeLink } from "@/components/HomeLink";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Support = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                    rows={4}
                  />
                </div>
                <Button className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
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