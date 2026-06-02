import { Link2, MousePointerClick, Plus, Search } from "lucide-react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getClicksForUrl } from "@/lib/apiClicks";
import { getUrls } from "@/lib/apiUrls";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import LinkCard from "@/components/common/LinkCard";

const Dashboard = () => {
  const loading = false;
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const [totalClicks, setTotalClicks] = useState(0);
  const [clicksLoading, setClicksLoading] = useState(false);

  const dummyLinks = [
    {
      id: 1,
      title: "Portfolio Website",
      originalUrl: "https://dipika-portfolio.vercel.app",
      shortUrl: "https://shortly.app/abc123",
      createdAt: "2 June 2026",
    },
    {
      id: 2,
      title: "Job Portal Project",
      originalUrl: "https://job-portal-mern.vercel.app",
      shortUrl: "https://shortly.app/job456",
      createdAt: "31 May 2026",
    },
    {
      id: 3,
      title: "Netflix AI Clone",
      originalUrl: "https://netflix-ai-clone.vercel.app",
      shortUrl: "https://shortly.app/nfx789",
      createdAt: "29 May 2026",
    },
    {
      id: 4,
      title: "QuickBite Food App",
      originalUrl: "https://quickbite-food.vercel.app",
      shortUrl: "https://shortly.app/qb101",
      createdAt: "27 May 2026",
    },
    {
      id: 5,
      title: "Landing Page Design",
      originalUrl: "https://landing-page-ui.vercel.app",
      shortUrl: "https://shortly.app/ui202",
      createdAt: "25 May 2026",
    },
  ];

  const {
    data: urlData,
    loading: urlLoading,
    error: urlError,
    fn: fnUrls,
  } = useFetch(getUrls);

  const filteredUrls =
    searchQuery.trim() === ""
      ? urlData || []
      : urlData?.filter((url) => {
          const query = searchQuery.toLowerCase();

          return (
            url.title?.toLowerCase().includes(query) ||
            url.original - url?.toLowerCase().includes(query) ||
            url.short_url?.toLowerCase().includes(query)
          );
        }) || [];

  useEffect(() => {
    if (user?.id) {
      fnUrls(user.id);
    }
  }, [user]);

  useEffect(() => {
    const fetchClicks = async () => {
      if (!urlData?.length) {
        setTotalClicks(0);
        return;
      }

      setClicksLoading(true);

      try {
        const clicks = await Promise.all(
          urlData.map((url) => getClicksForUrl(url.id)),
        );

        const count = clicks.reduce(
          (sum, clickArray) => sum + clickArray.length,
          0,
        );

        setTotalClicks(count);
      } finally {
        setClicksLoading(false);
      }
    };

    fetchClicks();
  }, [urlData]);

  return (
    <div className="min-h-screen bg-[#0b1020] text-white p-5 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">My Links</h1>
          <p className="text-zinc-400 mt-1">
            Manage and track all your shortened URLs
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all">
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
            <h2 className="text-4xl font-bold">12</h2>
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
            <h2 className="text-4xl font-bold">248</h2>
            <p className="text-zinc-400 mt-2 text-sm">
              Total clicks across all links
            </p>
          </CardContent>
        </Card>
      </div>

      {loading && (
        <div className="mb-6">
          <BarLoader width={"100%"} color="#ffffff" />
        </div>
      )}

      {!loading && (
        <div className="relative mb-8">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search your links..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-white transition-all"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-5">
        {urlLoading ? (
          <p>Loading...</p>
        ) : (
          filteredUrls.map((url) => <LinkCard key={url.id} card={url} />)
        )}
      </div>
    </div>
  );
};

export default Dashboard;
