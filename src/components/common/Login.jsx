import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schema/loginSchema";
import useFetch from "@/hooks/useFetch";
import { logIn } from "@/lib/apiAuth";
import { replace, useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const createNew = searchParams.get("createNew");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

   const { data, loading, error, fn:loginFn } = useFetch(logIn);

  const onSubmit = async (formData) => {
   const res = await loginFn(formData);

   if(res?.user){
     navigate(
        createNew
          ? `/dashboard?createNew=${encodeURIComponent(createNew)}`
          : "/dashboard"
      , replace);
   }
  };

  return (
    <Card className="w-full border border-violet-500/20 bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(139,92,246,0.15)]">

      <CardHeader className="space-y-2">

        <CardTitle className="text-2xl text-white">
          Welcome Back
        </CardTitle>

        <CardDescription className="text-slate-400">
          Login to continue managing your shortened links.
        </CardDescription>

      </CardHeader>

      <CardContent>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">

            <Input
              type="email"
              placeholder="Enter your email"
              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-400">
                {errors.email.message}
              </p>
            )}

          </div>

          <div className="space-y-2">

            <Input
              type="password"
              placeholder="Enter your password"
              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-sm text-red-400">
                {errors.password.message}
              </p>
            )}

          </div>

           {error && (
            <p className="text-sm text-center text-red-400">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

        </form>

      </CardContent>

    </Card>
  );
};

export default Login;