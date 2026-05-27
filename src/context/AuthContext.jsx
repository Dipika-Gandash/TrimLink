import { createContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

const fetchProfile = async (authUser) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authUser.id)
      .single();

    if (error) throw error;

    setProfile(data);

  } catch (err) {
    console.log(err);
  }
};
 useEffect(() => {
 const initialize = async () => {
  try{
      setLoading(true);

      const {
        data:{session}
      } = await supabase.auth.getSession();

      const authUser=session?.user ?? null;

      setUser(authUser);

      if(authUser){
         await fetchProfile(authUser);
      }

  } catch(err){
      console.log(err);

  } finally{
      setLoading(false);
  }
};

  initialize();

  const {
    data: { subscription }
  } = supabase.auth.onAuthStateChange(
    (event, session) => {

      if (event === "TOKEN_REFRESHED") return;
      const authUser = session?.user ?? null;

      setUser(authUser);

      if (authUser) {
        setTimeout(() => {
          fetchProfile(authUser);
        },0);
      } else {
        setProfile(null);
      }
    }
  );

  return () => subscription.unsubscribe();

},[]);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
