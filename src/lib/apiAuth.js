import { supabase } from "./supabase";

export const logIn = async ({ email, password }) => {

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const signUp = async ({email, password}) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    })

    if(error) {
        throw new Error(error.message);
    }

    return data;
}

export const logOut = async () => {
    const { error } = await supabase.auth.signOut();

    if(error) {
        throw new Error(error.message);
    }
}