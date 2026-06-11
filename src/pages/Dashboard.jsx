import { Link2, MousePointerClick, Plus, Search } from "lucide-react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import LinkCard from "@/components/common/LinkCard";
import { getUrlsWithClickCounts } from "@/lib/apiUrls";
import CreateLinkModal from "@/components/common/CreateLink";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { user } = useAuth();

  const {
    data: urlData,
    loading: urlLoading,
    error: urlError,
    fn: fnUrls,
  } = useFetch(getUrlsWithClickCounts);

  useEffect(() => {
    if (user?.id) {
      fnUrls(user.id);
    }
  }, [user?.id]);

  const totalLinks = urlData?.length ?? 0;

  const totalClicks = urlData?.reduce(
    (sum, url) => sum + (url.click_count ?? 0), 0
  ) ?? 0;

  const filteredUrls =
    searchQuery.trim() === ""
      ? urlData ?? []
      : urlData?.filter((url) => {
          const q = searchQuery.toLowerCase();
          return (
            url.title?.toLowerCase().includes(q) ||
            url.original_url?.toLowerCase().includes(q) ||
            url.short_url?.toLowerCase().includes(q)
          );
        }) ?? [];

  return (
    <div className="min-h-screen bg-[#0b1020] text-white p-5 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">My Links</h1>
          <p className="text-zinc-400 mt-1">
            Manage and track all your shortened URLs
          </p>
        </div>

                <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all"
        >
          <Plus size={18} />
          Create New Link
        </button>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        <Card className="bg-[#1a1638] border border-zinc-800 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-zinc-300">
              <span>Total Links</span>
              <div className="bg-zinc-800 p-2 rounded-lg">
                <Link2 size={18} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl font-bold">
              {urlLoading ? "—" : totalLinks}
            </h2>
            <p className="text-zinc-400 mt-2 text-sm">
              Total shortened URLs created
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1638] border border-zinc-800 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-zinc-300">
              <span>Total Clicks</span>
              <div className="bg-zinc-800 p-2 rounded-lg">
                <MousePointerClick size={18} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl font-bold">
              {urlLoading ? "—" : totalClicks}
            </h2>
            <p className="text-zinc-400 mt-2 text-sm">
              Total clicks across all links
            </p>
          </CardContent>
        </Card>
      </div>

      {urlLoading && (
        <div className="mb-6">
          <BarLoader width={"100%"} color="#ffffff" />
        </div>
      )}

      {!urlLoading && (
        <div className="relative mb-8">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            placeholder="Search your links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-white transition-all"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-5">
        {urlLoading ? null : filteredUrls.length === 0 ? (
          <p className="text-zinc-500 text-center py-10">
            {searchQuery ? "No links match your search." : "No links yet. Create your first one!"}
          </p>
        ) : (
          filteredUrls.map((url) => <LinkCard key={url.id} card={url} userId={user?.id} refreshUrls={() => fnUrls(user.id)}/>)
        )}
      </div>
       <CreateLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={() => fnUrls(user.id)}
      />
    </div>
  );
};

export default Dashboard;