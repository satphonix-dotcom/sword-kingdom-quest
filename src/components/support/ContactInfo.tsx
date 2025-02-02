import React from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";

export const ContactInfo = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Mail className="text-gameGold w-5 h-5" />
        <span className="text-gray-300">support@gameofswordkings.com</span>
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
  );
};