"use client";

import { motion } from "framer-motion";
import { 
  SparklesIcon, 
  AcademicCapIcon, 
  BriefcaseIcon, 
  WrenchScrewdriverIcon, 
  HeartIcon 
} from "@heroicons/react/24/outline";

interface GenerationFormProps {
  formData: any;
  setFormData: (data: any) => void;
  loading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
}

export default function GenerationForm({ formData, setFormData, loading, error, onSubmit }: GenerationFormProps) {
  return (
    <div className="space-y-16">
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight">Your Journey Starts Here</h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">Provide a few details and our AI will engineer a precision roadmap for your specific career path.</p>
      </div>

      <div className="relative group max-w-5xl mx-auto">
        <div className="absolute -inset-1 bg-linear-to-r from-accent to-accent-secondary rounded-[3rem] blur opacity-20 group-hover:opacity-30 transition duration-1000" />
        <div className="relative glass p-10 md:p-16 rounded-[3rem] shadow-2xl overflow-hidden bg-zinc-950/80 backdrop-blur-3xl border border-white/10">
          
          <form onSubmit={onSubmit} className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-xs font-black tracking-[0.2em] text-zinc-500 uppercase flex items-center gap-2 pl-1">
                  <BriefcaseIcon className="w-4 h-4 text-accent" />
                  Your Background
                </label>
                <div className="relative group/input">
                  <input 
                    type="text" 
                    placeholder="e.g. BSc Mathematics, Fresher"
                    className="w-full bg-white/3 border border-white/10 rounded-2xl px-12 py-5 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all placeholder:text-zinc-700 font-medium text-lg"
                    value={formData.background}
                    onChange={(e) => setFormData({...formData, background: e.target.value})}
                    required
                  />
                  <BriefcaseIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within/input:text-accent transition-colors" />
                </div>
                <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest pl-1">Mention your degree or current role</p>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black tracking-[0.2em] text-zinc-500 uppercase flex items-center gap-2 pl-1">
                  <AcademicCapIcon className="w-4 h-4 text-accent" />
                  Target Career
                </label>
                <div className="relative group/input">
                  <input 
                    type="text" 
                    placeholder="e.g. AI Researcher at Google"
                    className="w-full bg-white/3 border border-white/10 rounded-2xl px-12 py-5 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all placeholder:text-zinc-700 font-medium text-lg"
                    value={formData.goal}
                    onChange={(e) => setFormData({...formData, goal: e.target.value})}
                    required
                  />
                  <AcademicCapIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within/input:text-accent transition-colors" />
                </div>
                <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest pl-1">Where do you want to be in 2 years?</p>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black tracking-[0.2em] text-zinc-500 uppercase flex items-center gap-2 pl-1">
                  <WrenchScrewdriverIcon className="w-4 h-4 text-accent" />
                  Current Skills
                </label>
                <div className="relative group/input">
                  <textarea 
                    placeholder="e.g. Python, SQL, Project Management"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-12 py-5 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all min-h-[140px] resize-none placeholder:text-zinc-700 font-medium text-lg"
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    required
                  />
                  <WrenchScrewdriverIcon className="absolute left-4 top-6 w-5 h-5 text-zinc-600 group-focus-within/input:text-accent transition-colors" />
                </div>
                <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest pl-1">Separate skills with commas</p>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black tracking-[0.2em] text-zinc-500 uppercase flex items-center gap-2 pl-1">
                  <HeartIcon className="w-4 h-4 text-accent" />
                  Personal Interests
                </label>
                <div className="relative group/input">
                  <textarea 
                    placeholder="e.g. Robotics, Quantitative Finance, Web3"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-12 py-5 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all min-h-[140px] resize-none placeholder:text-zinc-700 font-medium text-lg"
                    value={formData.interests}
                    onChange={(e) => setFormData({...formData, interests: e.target.value})}
                    required
                  />
                  <HeartIcon className="absolute left-4 top-6 w-5 h-5 text-zinc-600 group-focus-within/input:text-accent transition-colors" />
                </div>
                <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest pl-1">Helps AI suggest relevant mini-projects</p>
              </div>
            </div>
            
            <div className="space-y-6 pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full group relative overflow-hidden bg-accent text-white font-black text-2xl py-7 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.3)] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? "Engineering Your Success..." : "Generate My Roadmap"}
                  {!loading && <SparklesIcon className="w-6 h-6" />}
                </span>
              </button>
              <p className="text-center text-sm text-zinc-500 font-bold uppercase tracking-widest opacity-60 flex items-center justify-center gap-2">
                <SparklesIcon className="w-4 h-4 text-accent" />
                Personalized AI generation is compute-intensive but free
              </p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold text-center flex items-center justify-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {error}
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
