import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileCountrySelect } from "./country-select/MobileCountrySelect";
import { DesktopCountrySelect } from "./country-select/DesktopCountrySelect";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface SignUpFormProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  acceptedTerms: boolean;
  setAcceptedTerms: (value: boolean) => void;
}

export const SignUpForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  country,
  setCountry,
  email,
  setEmail,
  password,
  setPassword,
  acceptedTerms,
  setAcceptedTerms,
}: SignUpFormProps) => {
  const isMobile = useIsMobile();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="First Name *"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
      />
      <Input
        type="text"
        placeholder="Last Name *"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
      />
      {isMobile ? (
        <MobileCountrySelect value={country} onChange={setCountry} />
      ) : (
        <DesktopCountrySelect value={country} onChange={setCountry} />
      )}
      <Input
        type="email"
        placeholder="Email *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
      />
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password *"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={acceptedTerms}
          onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
          className="border-white/30 data-[state=checked]:bg-gameGold data-[state=checked]:text-white"
        />
        <label htmlFor="terms" className="text-sm text-gray-300">
          I agree to the{" "}
          <Link to="/terms" className="text-gameGold hover:underline" target="_blank">
            Terms and Conditions
          </Link>
        </label>
      </div>
    </div>
  );
};