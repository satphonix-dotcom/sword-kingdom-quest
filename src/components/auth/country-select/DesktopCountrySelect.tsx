import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCountrySearch } from "@/hooks/use-country-search";
import { countries } from "@/constants/countries";

interface DesktopCountrySelectProps {
  country: string;
  setCountry: (value: string) => void;
}

export const DesktopCountrySelect = ({
  country,
  setCountry,
}: DesktopCountrySelectProps) => {
  return (
    <Select value={country} onValueChange={setCountry} required>
      <SelectTrigger className="bg-white/20 border-white/30 text-white">
        <SelectValue placeholder="Select your country *" />
      </SelectTrigger>
      <SelectContent
        position="popper"
        className="max-h-[300px] bg-gamePurple border-white/30"
        sideOffset={4}
      >
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
  );
};