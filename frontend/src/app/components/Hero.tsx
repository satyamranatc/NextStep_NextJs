"use client";

import { motion } from "framer-motion";
import { SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hero-gradient pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-bold uppercase tracking-widest shadow-lg shadow-accent/5 backdrop-blur-sm"
        >
          <SparklesIcon className="w-4 h-4" />
          The Future of Career Guidance
        </motion.div>
        
        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-none max-w-5xl mx-auto"
          >
            AI That Plans Your Career,<br />
            <span className="gradient-text">Step-by-Step.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed font-medium"
          >
            Stop following generic advice. Get an AI-engineered roadmap tailored to your specific background, skills, and market reality.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full">
            <a href="#roadmap" className="w-full sm:w-auto px-12 py-6 bg-accent hover:bg-accent/90 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all hover:scale-105 active:scale-95 text-xl">
              Generate My Roadmap <ArrowRightIcon className="w-6 h-6" />
            </a>
            <button className="w-full sm:w-auto px-12 py-6 glass hover:bg-white/5 text-white rounded-2xl font-bold transition-all border border-white/10 hover:scale-105 active:scale-95 text-xl">
              View Examples
            </button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-bold text-zinc-500 flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-accent" />
              Takes less than 30 seconds • No signup required
            </p>
          </div>
        </motion.div>

        {/* Improved Roadmap Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="pt-20 max-w-5xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-accent to-accent-secondary rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative glass p-4 md:p-8 rounded-[2.5rem] border border-white/10 flex flex-col md:flex-row items-center gap-10 text-left bg-zinc-950/50 backdrop-blur-2xl">
              <div className="w-full md:w-1/3 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                  <SparklesIcon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-white text-2xl tracking-tight text-left">Real-time AI Synthesis</h4>
                <p className="text-zinc-500 text-sm leading-relaxed text-left">"Since you're a CS grad with Python skills, we'll skip basics and focus on Fast API deployment and System Design..."</p>
                <div className="flex gap-2 pt-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className={`w-8 h-1.5 rounded-full ${i === 1 ? 'bg-accent' : 'bg-white/10'}`} />
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full space-y-4">
                {[
                  { t: "Phase 1: Advanced Architecture", d: "Deep dive into microservices...", s: "Done" },
                  { t: "Phase 2: Market Integration", d: "Mock interviews with industry leads...", s: "Next" }
                ].map((item, idx) => (
                  <div key={idx} className="glass p-5 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div className="space-y-1 text-left">
                      <p className="text-white font-bold">{item.t}</p>
                      <p className="text-zinc-500 text-xs">{item.d}</p>
                    </div>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${idx === 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-accent/10 text-accent'}`}>
                      {item.s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
