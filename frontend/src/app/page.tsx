"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WebGLBackground from "./components/WebGLBackground";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import FeatureGrid from "./components/FeatureGrid";
import GenerationForm from "./components/GenerationForm";
import RoadmapDetail from "./components/RoadmapDetail";
import HistoryList from "./components/HistoryList";
import { ChevronRightIcon, ChatBubbleLeftRightIcon, EnvelopeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [formData, setFormData] = useState({
    background: "",
    skills: "",
    interests: "",
    goal: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchHistory();
    
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: "#features",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, []);

  const fetchHistory = async () => {
    try {
      const resp = await fetch("http://localhost:8000/roadmaps");
      if (resp.ok) {
        const data = await resp.json();
        setHistory(data);
      }
    } catch (err) {
      console.error("Failed to fetch history", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          background: formData.background,
          skills: formData.skills.split(",").map((s: string) => s.trim()),
          interests: formData.interests.split(",").map((i: string) => i.trim()),
          goal: formData.goal,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || "Failed to generate roadmap");
      }

      setRoadmap(data);
      fetchHistory();
      
      // Scroll to roadmap
      setTimeout(() => {
        document.getElementById("roadmap-result")?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStep = async (stepId: number, update: any) => {
    try {
      const response = await fetch(`http://localhost:8000/steps/${stepId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      });
      
      if (response.ok) {
        const updatedStep = await response.json();
        setRoadmap((prev: any) => ({
          ...prev,
          steps: prev.steps.map((s: any) => s.id === stepId ? updatedStep : s)
        }));
      }
    } catch (err) {
      console.error("Failed to update step", err);
    }
  };

  const handleRegenerate = async () => {
    if (!roadmap) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/roadmaps/${roadmap.id}/regenerate`, {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        setRoadmap(data);
      }
    } catch (err) {
      console.error("Failed to regenerate roadmap", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-accent/30 overflow-x-hidden font-sans">
      <WebGLBackground />
      <Navigation />

      <main className="pt-16">
        <Hero />
        
        {/* Subtle Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-7xl mx-auto" />

        {/* Social Proof / Trust Section */}
        <section className="py-20 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black mb-12 opacity-60">Trusted by ambitious learners across the globe</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale brightness-150">
               <span className="text-2xl font-black italic tracking-tighter">Google</span>
               <span className="text-2xl font-black italic tracking-tighter">Meta</span>
               <span className="text-2xl font-black italic tracking-tighter">Microsoft</span>
               <span className="text-2xl font-black italic tracking-tighter">Stripe</span>
               <span className="text-2xl font-black italic tracking-tighter">Vercel</span>
            </div>
          </div>
        </section>

        <FeatureGrid />

        {/* Subtle Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-7xl mx-auto" />

        <section id="roadmap" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatePresence mode="wait">
              {!roadmap ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                >
                  <GenerationForm 
                    formData={formData} 
                    setFormData={setFormData}
                    loading={loading}
                    error={error}
                    onSubmit={handleSubmit}
                  />
                </motion.div>
              ) : (
                <motion.div 
                  id="roadmap-result"
                  key="results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-16"
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
                    <div className="space-y-6">
                      <button 
                        onClick={() => setRoadmap(null)}
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-accent transition-colors group"
                      >
                        <ChevronRightIcon className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Start Over
                      </button>
                      <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">{roadmap.title}</h2>
                      <div className="relative group max-w-4xl">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
                        <p className="text-zinc-400 text-xl md:text-2xl font-medium pl-8 italic leading-relaxed">"{roadmap.overview}"</p>
                      </div>
                    </div>
                  </div>

                  <RoadmapDetail 
                    roadmap={roadmap} 
                    onUpdateStep={handleUpdateStep} 
                    onRegenerate={handleRegenerate}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <HistoryList history={history} onSelect={setRoadmap} />
      </main>

      {/* Upgraded Footer */}
      <footer className="pt-24 pb-12 border-t border-white/5 bg-zinc-950/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6 col-span-1 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center justify-center">
                 <GlobeAltIcon className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-white">NextStep AI</span>
            </div>
            <p className="text-zinc-500 max-w-xs font-medium leading-relaxed">
              Engineering the next generation of career paths with precision AI guidance for the global workforce.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-white">Resources</h4>
            <ul className="space-y-4 text-zinc-500 font-bold text-sm">
              <li className="hover:text-accent transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-accent transition-colors cursor-pointer">How it Works</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Success Stories</li>
              <li className="hover:text-accent transition-colors cursor-pointer">API Docs</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-white">Connect</h4>
            <ul className="space-y-4 text-zinc-500 font-bold text-sm">
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                <ChatBubbleLeftRightIcon className="w-5 h-5" /> Discord
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                <EnvelopeIcon className="w-5 h-5" /> Support
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                 <GlobeAltIcon className="w-5 h-5" /> LinkedIn
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest leading-relaxed">© 2026 NextStep Technologies. All rights reserved.</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
