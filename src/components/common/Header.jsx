import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Scissors,
  Link2,
  LogOut,
  Zap,
  ChevronDown,
} from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  const user = true;

  return (
    <header className="sticky top-0 z-50 border-b border-violet-500/10 bg-[#120f2c]/95 backdrop-blur">
      <nav className="mx-auto flex h-17 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/20">
            <Scissors size={18} className="text-white" />
          </div>

          <h1 className="text-[22px] font-bold tracking-tight text-white">
            Trim<span className="text-violet-400">Link</span>
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Button
                variant="outline"
                onClick={() => navigate("/auth")}
                className="border-violet-400/30 bg-transparent text-violet-300 hover:bg-violet-500/10 hover:text-white"
              >
                Log in
              </Button>

              <Button
                onClick={() => navigate("/auth")}
                className="bg-violet-600 text-white hover:bg-violet-700"
              >
                Get Started
              </Button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="hidden items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition-all hover:bg-violet-500/20 md:flex"
              >
                <Zap size={14} />
                New Link
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-2 py-1 transition-colors hover:bg-violet-400/10 focus:outline-none">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" />

                      <AvatarFallback className="bg-violet-600 text-xs font-semibold text-white">
                        DK
                      </AvatarFallback>
                    </Avatar>

                    <span className="hidden text-sm font-medium text-violet-100 sm:block">
                      Dipika
                    </span>

                    <ChevronDown
                      size={14}
                      className="hidden text-violet-400 sm:block"
                    />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-2xl border border-violet-400/15 bg-[#1a1638] p-2 text-white shadow-2xl"
                >
                  
                  <div className="mb-2 border-b border-violet-400/10 px-2 pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://github.com/shadcn.png" />

                        <AvatarFallback className="bg-violet-600 text-white">
                          DK
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          Dipika
                        </p>

                        <p className="text-xs text-violet-300">
                          dipika@email.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => navigate("/links")}
                      className="cursor-pointer rounded-lg text-violet-200 focus:bg-violet-500/10 focus:text-white"
                    >
                      <Link2 className="mr-2 h-4 w-4" />
                      My Links
                    </DropdownMenuItem>
                  </DropdownMenuGroup>


                  <div className="mt-2 border-t border-violet-400/10 pt-2">
                    <DropdownMenuItem className="cursor-pointer rounded-lg text-red-400 focus:bg-red-500/10 focus:text-red-300">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

Header.displayName = "Header";

export default Header;