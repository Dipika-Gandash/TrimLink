import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import Login from "@/components/common/Login";
import SignUp from "@/components/common/SignUp";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const hasUrl = searchParams.get("createNew");

  return (
    <section className="min-h-[90vh] bg-[#101b33] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-violet-500/10 border border-violet-400/20 rounded-2xl px-6 py-10 shadow-[0_0_60px_rgba(139,92,246,0.25)] backdrop-blur-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            {hasUrl ? "Login to continue" : "Login or create account"}
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            {hasUrl
              ? "You need to login before shortening this URL"
              : "Access your account or create a new one to get started"}
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="flex w-full bg-white/5 border border-violet-500/20 rounded-xl px-2 py-6 h-auto gap-1.5">
            <TabsTrigger
              value="login"
              className="flex-1 p-3 text-base font-medium text-slate-300 data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-lg transition"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="flex-1 p-3 text-base font-medium text-slate-300 data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-lg transition"
            >
              Create Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <Login />
          </TabsContent>
          <TabsContent value="signup" className="mt-6">
            <SignUp />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Auth;