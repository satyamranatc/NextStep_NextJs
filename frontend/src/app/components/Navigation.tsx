"use client";

import { RocketLaunchIcon } from "@heroicons/react/24/outline";

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 h-16 flex items-center px-6 md:px-12 justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
          <RocketLaunchIcon className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight">NextStep</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
        <a href="#roadmap" className="px-4 py-2 bg-accent/10 text-accent rounded-full border border-accent/20 hover:bg-accent/20 transition-all">Generate Now</a>
      </div>
    </nav>
  );
}
