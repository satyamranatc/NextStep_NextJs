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
import { ChevronRightIcon } from "@heroicons/react/24/outline";

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
          skills: formData.skills.split(",").map((s) => s.trim()),
          interests: formData.interests.split(",").map((i) => i.trim()),
          goal: formData.goal,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || "Failed to generate roadmap");
      }

      setRoadmap(data);
      fetchHistory();
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
    <div className="bg-background text-foreground min-h-screen selection:bg-accent/30 overflow-x-hidden">
      <WebGLBackground />
      <Navigation />

      <main className="pt-16">
        <Hero />
        
        {/* Social Proof / Trust Section */}
        <section className="py-12 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold mb-8">Trusted by 10,000+ ambitious learners from</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale brightness-200">
              <span className="text-xl font-black italic">Google</span>
              <span className="text-xl font-black italic">Meta</span>
              <span className="text-xl font-black italic">Microsoft</span>
              <span className="text-xl font-black italic">Stripe</span>
              <span className="text-xl font-black italic">OpenAI</span>
            </div>
          </div>
        </section>

        <FeatureGrid />

        <section id="roadmap" className="py-24 relative">
          <div className="max-w-6xl mx-auto px-6">
            <AnimatePresence mode="wait">
              {!roadmap ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
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
                  key="results"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-12"
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                      <button 
                        onClick={() => setRoadmap(null)}
                        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
                      >
                        <ChevronRightIcon className="w-4 h-4 rotate-180" /> Back to Generation
                      </button>
                      <h2 className="text-4xl md:text-6xl font-black">{roadmap.title}</h2>
                      <p className="text-zinc-400 text-lg max-w-3xl border-l-4 border-accent pl-6">{roadmap.overview}</p>
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

      <footer className="py-12 border-t border-white/5 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 grayscale brightness-200 opacity-50">
          <span className="font-bold text-lg text-white">NextStep AI Guidance</span>
        </div>
        <p className="text-zinc-500 text-sm">© 2026. Adaptive & Living Career Roadmap.</p>
      </footer>
    </div>
  );
}
