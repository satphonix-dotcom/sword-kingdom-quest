import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/constants/countries";
import { supabase } from "@/integrations/supabase/client";

interface EditProfileFormProps {
  profile: {
    username: string;
    first_name: string | null;
    last_name: string | null;
    country: string | null;
  };
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const EditProfileForm = ({
  profile,
  userId,
  onSuccess,
  onCancel,
}: EditProfileFormProps) => {
  const [username, setUsername] = useState(profile.username);
  const [firstName, setFirstName] = useState(profile.first_name || "");
  const [lastName, setLastName] = useState(profile.last_name || "");
  const [country, setCountry] = useState(profile.country || "");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          first_name: firstName,
          last_name: lastName,
          country,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Profile updated successfully",
        description: "Your profile has been updated.",
      });
      onSuccess();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium text-gray-200">
          Username
        </label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="firstName" className="text-sm font-medium text-gray-200">
          First Name
        </label>
        <Input
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lastName" className="text-sm font-medium text-gray-200">
          Last Name
        </label>
        <Input
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="country" className="text-sm font-medium text-gray-200">
          Country
        </label>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white">
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px] overflow-y-auto bg-gamePurple border-white/30">
            {countries.map((country) => (
              <SelectItem
                key={country}
                value={country}
                className="text-white hover:bg-white/20"
              >
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="bg-white/20 hover:bg-white/30 text-white border-white/30"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gameGold hover:bg-gameGold/90 text-gamePurple"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};