import { supabase } from "@/integrations/supabase/client";

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
}

export const signUp = async ({ email, password, firstName, lastName, country }: SignUpData) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        country: country,
      },
    },
  });
  if (error) throw error;
};

export const signIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
};