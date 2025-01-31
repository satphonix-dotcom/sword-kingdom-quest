import { HomeLink } from "@/components/HomeLink";
import { AuthForm } from "@/components/AuthForm";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate flex items-center justify-center p-4 relative">
      <HomeLink />
      <div className="w-full max-w-4xl mx-auto">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;