import { createContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchProfile = async (authUser) => {

    if (!authUser) {
      setProfile(null);
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authUser.id)
      .single();

    if (!error) {
      setProfile(data);
    }
  };


  useEffect(() => {

    const getUser = async () => {

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const authUser =
        session?.user ?? null;

      setUser(authUser);

      await fetchProfile(authUser);

      setLoading(false);
    };

    getUser();


    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {

        const authUser =
          session?.user ?? null;

        setUser(authUser);

        await fetchProfile(authUser);

        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };

  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;