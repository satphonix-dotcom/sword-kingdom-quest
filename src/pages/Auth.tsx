import { HomeLink } from "@/components/HomeLink";
import { AuthForm } from "@/components/AuthForm";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate flex items-center justify-center p-4">
      <HomeLink />
      <AuthForm />
    </div>
  );
};

export default Auth;