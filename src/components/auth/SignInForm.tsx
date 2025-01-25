import { Input } from "@/components/ui/input";

interface SignInFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}

export const SignInForm = ({
  email,
  setEmail,
  password,
  setPassword,
}: SignInFormProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};