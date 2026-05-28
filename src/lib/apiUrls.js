import { supabase } from "./supabase";

export const getUrls = async (userId) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

    if(error) {
        throw new Error(error.message)
    }
  return data;
};
