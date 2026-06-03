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

export const getUrlsWithClickCounts = async (user_id) => {
  const { data, error } = await supabase
    .from("urls")
    .select(`
      *,
      clicks(count)
    `)
    .eq("user_id", user_id);

  if (error) throw error;

  return data.map(url => ({
    ...url,
    click_count: url.clicks?.[0]?.count ?? 0,
  }));
};