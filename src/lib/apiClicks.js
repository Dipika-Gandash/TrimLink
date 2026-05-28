import { supabase } from "./supabase";

export const getClicksForUrl = async (urlId) => {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", urlId);

    if(error) {
        throw new Error(error.message);
    }

    return data;
};
