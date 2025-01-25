import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/constants/countries";

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
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
      />
      <Input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
      />
      <Select value={country} onValueChange={setCountry} required>
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
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
      />
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={acceptedTerms}
          onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
          className="border-white/30 data-[state=checked]:bg-gameGold data-[state=checked]:text-gamePurple"
        />
        <label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer">
          I accept the terms and conditions
        </label>
      </div>
    </div>
  );
};