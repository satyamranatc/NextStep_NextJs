"use client";

import { motion } from "framer-motion";
import { SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hero-gradient pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-bold uppercase tracking-widest shadow-lg shadow-accent/5"
        >
          <SparklesIcon className="w-4 h-4" />
          Powered by Advanced AI
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black tracking-tighter leading-[1.1] max-w-5xl mx-auto"
        >
          Engineering Your Career,<br />
          <span className="gradient-text">Step by Personalized Step.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed"
        >
          Stop following generic advice. Get an AI-powered roadmap tailored to your specific background, skills, and ambitions.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
            <a href="#roadmap" className="w-full sm:w-auto px-10 py-5 bg-accent hover:bg-accent/90 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-accent/40 transition-all active:scale-95 text-lg">
              Generate My Roadmap <ArrowRightIcon className="w-6 h-6" />
            </a>
            <button className="w-full sm:w-auto px-10 py-5 glass hover:bg-white/5 text-white rounded-2xl font-bold transition-all border border-white/10 active:scale-95 text-lg">
              View Examples
            </button>
          </div>
          <p className="text-sm font-medium text-zinc-500 flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-accent" />
            Takes less than 30s • No signup required
          </p>
        </motion.div>

        {/* Floating Preview Snippet */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="pt-16 max-w-4xl mx-auto opacity-70 hover:opacity-100 transition-opacity"
        >
          <div className="glass p-6 rounded-3xl border border-white/10 flex items-center gap-8 text-left">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
              <SparklesIcon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Previewing AI Guidance</p>
              <h4 className="font-bold text-white text-lg">"Since you have a Math background, we'll leverage your logic skills for Linear Algebra..."</h4>
            </div>
            <div className="hidden md:flex gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-rose-500" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
