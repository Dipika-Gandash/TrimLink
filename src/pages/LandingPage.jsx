import React from "react";
import { Link2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  return (
    <main className="relative overflow-hidden bg-[#0b1020] text-white">
      <div className="absolute left-1/2 -top-30 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
        
        <section className="flex min-h-[calc(100vh-68px)] w-full flex-col items-center justify-center text-center">
          
          <div className="mb-6 flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <Sparkles size={14} />
            Smart links. Faster sharing.
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Turn Long URLs Into
            <span className="bg-linear-150to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {" "}
              Clean Smart Links
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Create short, elegant, and shareable links in seconds. Track clicks,
            manage URLs, and simplify every link you share with TrimLink.
          </p>

          <div className="mt-10 w-full max-w-3xl">
            <form className="flex flex-col gap-3 rounded-2xl border border-violet-500/10 bg-white/5 p-3 backdrop-blur md:flex-row">
              
              <div className="relative flex-1">
                <Link2
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <Input
                  type="url"
                  placeholder="Paste your long URL here..."
                  className="h-14 border-0 bg-transparent pl-12 text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <Button className="h-14 rounded-xl bg-violet-600 px-8 text-base font-semibold hover:bg-violet-700">
                Shorten URL
              </Button>
            </form>

            <p className="mt-3 text-sm text-slate-400">
              Fast, secure, and built for modern sharing.
            </p>
          </div>

          <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            
            <div className="rounded-2xl border border-violet-500/10 bg-white/5 p-5 backdrop-blur">
              <h3 className="text-2xl font-bold text-violet-300">10K+</h3>
              <p className="mt-1 text-sm text-slate-400">
                Links shortened
              </p>
            </div>

            <div className="rounded-2xl border border-violet-500/10 bg-white/5 p-5 backdrop-blur">
              <h3 className="text-2xl font-bold text-violet-300">99.9%</h3>
              <p className="mt-1 text-sm text-slate-400">
                Reliable redirects
              </p>
            </div>

            <div className="rounded-2xl border border-violet-500/10 bg-white/5 p-5 backdrop-blur">
              <h3 className="text-2xl font-bold text-violet-300">
                Real-Time
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Analytics tracking
              </p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-4xl pb-24">

          <TrimLinkHero />
          
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-3 text-slate-400">
              Everything you need to know about TrimLink.
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            className="mt-10 space-y-4"
          >
            <AccordionItem
              value="item-1"
              className="rounded-2xl border border-violet-500/10 bg-white/5 px-6 backdrop-blur"
            >
              <AccordionTrigger className="text-left text-base font-medium text-white hover:no-underline">
                Is TrimLink free to use?
              </AccordionTrigger>

              <AccordionContent className="pb-5 text-sm leading-7 text-slate-300">
                Yes, TrimLink is completely free for shortening and managing your links.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="rounded-2xl border border-violet-500/10 bg-white/5 px-6 backdrop-blur"
            >
              <AccordionTrigger className="text-left text-base font-medium text-white hover:no-underline">
                Can I create custom short URLs?
              </AccordionTrigger>

              <AccordionContent className="pb-5 text-sm leading-7 text-slate-300">
                Yes, you can personalize your short links with custom aliases based on availability.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="rounded-2xl border border-violet-500/10 bg-white/5 px-6 backdrop-blur"
            >
              <AccordionTrigger className="text-left text-base font-medium text-white hover:no-underline">
                Does TrimLink track analytics?
              </AccordionTrigger>

              <AccordionContent className="pb-5 text-sm leading-7 text-slate-300">
                Yes, you can track clicks, devices, countries, and other useful analytics for your links.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="rounded-2xl border border-violet-500/10 bg-white/5 px-6 backdrop-blur"
            >
              <AccordionTrigger className="text-left text-base font-medium text-white hover:no-underline">
                Are my links secure?
              </AccordionTrigger>

              <AccordionContent className="pb-5 text-sm leading-7 text-slate-300">
                Absolutely. All shortened links are handled securely with reliable redirects.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </main>
  );
};

export default LandingPage;

 function TrimLinkHero() {
  return (
    <section className="min-h-screen bg-[#101b33] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 w-125 h-75 -translate-x-1/2 -translate-y-1/2 bg-cyan-400/10 blur-3xl rounded-full" />

      <div className="relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-sm mb-6">
          ✦ Fast & Clean URL Shortener
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-none">
          Trim
          <span className="text-cyan-300">.</span>
          Link
        </h1>

        <p className="mt-5 text-slate-400 text-lg">
          Turn long messy URLs into clean shareable links.
        </p>

        <div className="mt-8 flex flex-col items-center gap-5">

          <div className="bg-white/4 border border-white/10 text-slate-500 px-6 py-4 rounded-2xl backdrop-blur-xl max-w-2xl w-full truncate">
            https://very-long-link-example.com/product/category/item
          </div>

          <div className="w-px h-10 bg-linear-to-b from-cyan-400 to-transparent" />

          <div className="bg-cyan-400/10 border border-cyan-300/20 px-6 py-4 rounded-2xl backdrop-blur-xl flex items-center gap-4">

            <span className="text-cyan-300 font-semibold text-xl">
              trim.link/abc123
            </span>

            <button className="text-sm bg-cyan-300 text-slate-900 px-4 py-1.5 rounded-lg font-medium hover:scale-105 transition-all duration-300">
              Copy
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}