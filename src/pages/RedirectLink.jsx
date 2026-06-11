import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase"; 
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { shortUrl } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      const { data, error } = await supabase
        .from("urls")
        .select("id, original_url") // get both
        .eq("short_url", shortUrl)
        .single();

      if (error || !data) {
        // short url doesn't exist — send to 404 or home
        navigate("/not-found");
        return;
      }
      await supabase.from("clicks").insert([{ url_id: data.id }]);

      // redirect to the original url
      window.location.href = data.original_url;
    };

    redirect();
  }, [shortUrl]);

  // show loading while fetching
  return (
    <div className="min-h-screen bg-[#0b1020] flex flex-col items-center justify-center gap-4">
      <h2 className="text-white text-xl font-medium">Redirecting you...</h2>
      <BarLoader color="#ffffff" width={200} />
    </div>
  );
};

export default RedirectLink;
