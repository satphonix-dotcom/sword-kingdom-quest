import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useCountrySearch } from "@/hooks/use-country-search";

interface DesktopCountrySelectProps {
  country: string;
  setCountry: (value: string) => void;
}

export const DesktopCountrySelect = ({
  country,
  setCountry,
}: DesktopCountrySelectProps) => {
  const { searchQuery, setSearchQuery, filteredCountries } = useCountrySearch();

  return (
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
          <Input
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
};