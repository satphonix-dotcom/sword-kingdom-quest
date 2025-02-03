import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { countries } from "@/constants/countries";
import { useState } from "react";
import { Input as SearchInput } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { X } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setIsOpen(false);
    setSearchQuery("");
  };

  const MobileCountrySelect = () => (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full h-10 px-3 text-left flex justify-between items-center bg-white/20 border-white/30 text-white"
      >
        {country || "Select your country *"}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gamePurple border-white/30 text-white">
          <DialogHeader>
            <DialogTitle>Select Country</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <SearchInput
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
          <div className="mt-2 max-h-[300px] overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country}
                className="w-full text-left px-3 py-2 hover:bg-white/20 text-white"
                onClick={() => handleCountrySelect(country)}
              >
                {country}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );

  const DesktopCountrySelect = () => (
    <Select value={country} onValueChange={setCountry} required>
      <SelectTrigger className="bg-white/20 border-white/30 text-white">
        <SelectValue placeholder="Select your country *" />
      </SelectTrigger>
      <SelectContent
        position="popper"
        className="max-h-[200px] bg-gamePurple border-white/30"
        sideOffset={4}
      >
        <div className="p-2 sticky top-0 bg-gamePurple z-10">
          <SearchInput
            type="text"
            placeholder="Search countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {filteredCountries.map((country) => (
            <SelectItem
              key={country}
              value={country}
              className="text-white hover:bg-white/20"
            >
              {country}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );

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
      {isMobile ? <MobileCountrySelect /> : <DesktopCountrySelect />}
      <Input
        type="email"
        placeholder="Email *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
      />
      <Input
        type="password"
        placeholder="Password *"
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
          required
          className="border-white/30 data-[state=checked]:bg-gameGold data-[state=checked]:text-gamePurple"
        />
        <label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer">
          I accept the terms and conditions *
        </label>
      </div>
    </div>
  );
};