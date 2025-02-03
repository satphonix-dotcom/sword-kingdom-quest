import { PersonalInfoFields } from "./signup/PersonalInfoFields";
import { CredentialsFields } from "./signup/CredentialsFields";
import { TermsCheckbox } from "./signup/TermsCheckbox";

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
    <div className="space-y-6">
      <PersonalInfoFields
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        country={country}
        setCountry={setCountry}
      />
      <CredentialsFields
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <TermsCheckbox
        acceptedTerms={acceptedTerms}
        setAcceptedTerms={setAcceptedTerms}
      />
    </div>
  );
};