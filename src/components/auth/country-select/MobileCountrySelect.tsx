import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useCountrySearch } from "@/hooks/use-country-search";

interface MobileCountrySelectProps {
  country: string;
  setCountry: (value: string) => void;
}

export const MobileCountrySelect = ({
  country,
  setCountry,
}: MobileCountrySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { searchQuery, setSearchQuery, filteredCountries } = useCountrySearch();

  const handleCountrySelect = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
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
            <Input
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
};