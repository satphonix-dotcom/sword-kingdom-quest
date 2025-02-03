import { Button } from "@/components/ui/button";
import { SignUpForm } from "./auth/SignUpForm";
import { SignInForm } from "./auth/SignInForm";
import { useAuthForm } from "@/hooks/use-auth-form";

export const AuthForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    country,
    setCountry,
    acceptedTerms,
    setAcceptedTerms,
    isLoading,
    isSignUp,
    setIsSignUp,
    handleAuth,
  } = useAuthForm();

  return (
    <div className="w-full max-w-md space-y-8 bg-white/10 p-8 rounded-lg backdrop-blur-sm">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gameGold">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="mt-2 text-gray-300">
          {isSignUp
            ? "Sign up to start your adventure"
            : "Sign in to continue your quest"}
        </p>
      </div>

      <form onSubmit={handleAuth} className="mt-8 space-y-6">
        {isSignUp ? (
          <SignUpForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            country={country}
            setCountry={setCountry}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            acceptedTerms={acceptedTerms}
            setAcceptedTerms={setAcceptedTerms}
          />
        ) : (
          <SignInForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        )}

        <Button
          type="submit"
          className="w-full bg-gameGold text-gamePurple hover:bg-gameGold/90"
          disabled={isLoading}
        >
          {isLoading
            ? "Loading..."
            : isSignUp
            ? "Create Account"
            : "Sign In"}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-gameGold hover:underline"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Need an account? Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
};