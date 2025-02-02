import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<ContactFormData>({
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
  );
};