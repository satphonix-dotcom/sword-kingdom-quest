import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsCheckboxProps {
  acceptedTerms: boolean;
  setAcceptedTerms: (value: boolean) => void;
}

export const TermsCheckbox = ({
  acceptedTerms,
  setAcceptedTerms,
}: TermsCheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={acceptedTerms}
        onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
        className="border-white/30 data-[state=checked]:bg-gameGold data-[state=checked]:border-gameGold"
      />
      <label
        htmlFor="terms"
        className="text-sm text-gray-300 cursor-pointer"
      >
        I accept the{" "}
        <Link
          to="/terms"
          className="text-gameGold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms and Conditions
        </Link>
      </label>
    </div>
  );
};