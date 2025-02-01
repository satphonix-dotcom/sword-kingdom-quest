import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SignUpForm } from "./auth/SignUpForm";
import { SignInForm } from "./auth/SignInForm";
import { signUp, signIn } from "@/utils/auth";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && !acceptedTerms) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must accept the terms and conditions to create an account.",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp({ email, password, firstName, lastName, country });
        toast({
          title: "Success!",
          description: "Please check your email to verify your account.",
        });
      } else {
        await signIn(email, password);
        navigate("/");
      }
    } catch (error: any) {
      let errorMessage = "An error occurred. Please try again.";
      
      if (error.message.includes("invalid_credentials")) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Please verify your email before signing in.";
      } else if (error.message.includes("User already registered")) {
        errorMessage = "This email is already registered. Please sign in instead.";
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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