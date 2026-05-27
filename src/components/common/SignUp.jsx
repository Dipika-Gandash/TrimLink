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

import { signUpSchema } from "@/schema/signUpSchema";
import useFetch from "@/hooks/useFetch";
import { signUp } from "@/lib/apiAuth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const { data, loading, error, fn: fnSignUp } = useFetch(signUp);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      file: data.file?.[0],
    };

    const result = await fnSignUp(formData);

    if (result) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <Card className="w-full border border-violet-500/20 bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(139,92,246,0.15)]">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl text-white">Create Account</CardTitle>

        <CardDescription className="text-slate-400">
          Create your account and start shortening links.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your name"
              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
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
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="file"
              accept="image/*"
              className="border-white/10 bg-white/5 text-white"
              {...register("file")}
            />

            {errors.file && (
              <p className="text-sm text-red-400">{errors.file.message}</p>
            )}
          </div>

          {error && <p className="text-sm text-center text-red-400">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
