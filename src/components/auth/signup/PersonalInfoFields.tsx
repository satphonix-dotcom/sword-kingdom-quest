import { Input } from "@/components/ui/input";
import { isMobile } from "@/hooks/use-mobile";
import { MobileCountrySelect } from "../country-select/MobileCountrySelect";
import { DesktopCountrySelect } from "../country-select/DesktopCountrySelect";

interface PersonalInfoFieldsProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
}

export const PersonalInfoFields = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  country,
  setCountry,
}: PersonalInfoFieldsProps) => {
  const { isMobile } = useIsMobile();

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
        <MobileCountrySelect country={country} setCountry={setCountry} />
      ) : (
        <DesktopCountrySelect country={country} setCountry={setCountry} />
      )}
    </div>
  );
};