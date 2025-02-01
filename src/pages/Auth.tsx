import { HomeLink } from "@/components/HomeLink";
import { AuthForm } from "@/components/AuthForm";
import { GameLogo } from "@/components/GameLogo";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate flex flex-col items-center justify-center p-4 relative">
      <HomeLink />
      <div className="w-full max-w-md mx-auto">
        <GameLogo className="mb-8" />
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;