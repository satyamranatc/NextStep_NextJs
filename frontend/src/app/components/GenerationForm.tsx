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
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold">Start Your Journey</h2>
        <p className="text-zinc-500 max-w-xl mx-auto">Provide a few details and our AI will engineer a precision roadmap for your specific career path.</p>
      </div>

      <div className="glass p-1 md:p-12 rounded-4xl shadow-2xl overflow-hidden relative">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent-secondary/10 blur-[100px]" />
        
        <form onSubmit={onSubmit} className="space-y-8 relative z-10 p-8 md:p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-wide text-zinc-400 uppercase flex items-center gap-2">
                <BriefcaseIcon className="w-4 h-4 text-accent" />
                Current Background
              </label>
              <input 
                type="text" 
                placeholder="e.g. CS Student, Marketing Manager with 3y XP"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all placeholder:text-zinc-600"
                value={formData.background}
                onChange={(e) => setFormData({...formData, background: e.target.value})}
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-wide text-zinc-400 uppercase flex items-center gap-2">
                <AcademicCapIcon className="w-4 h-4 text-accent" />
                Target Career
              </label>
              <input 
                type="text" 
                placeholder="e.g. AI Researcher at a Tier 1 Lab"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all placeholder:text-zinc-600"
                value={formData.goal}
                onChange={(e) => setFormData({...formData, goal: e.target.value})}
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-wide text-zinc-400 uppercase flex items-center gap-2">
                <WrenchScrewdriverIcon className="w-4 h-4 text-accent" />
                Skills I Have
              </label>
              <textarea 
                placeholder="e.g. Python, Public Speaking, SQL, Project Management (separate with commas)"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all min-h-[120px] resize-none placeholder:text-zinc-600"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-wide text-zinc-400 uppercase flex items-center gap-2">
                <HeartIcon className="w-4 h-4 text-accent" />
                My Interests
              </label>
              <textarea 
                placeholder="e.g. Robotics, Creative Writing, Ethical Hacking, Quantitative Finance"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all min-h-[120px] resize-none placeholder:text-zinc-600"
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full group relative overflow-hidden bg-accent text-white font-black text-xl py-6 rounded-2xl shadow-2xl shadow-accent/40 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-3">
                {loading ? "Engineering Your Roadmap..." : "Generate My Roadmap"}
                {!loading && <SparklesIcon className="w-5 h-5" />}
              </span>
            </button>
            <p className="text-center text-xs text-zinc-500 font-medium">✨ Be as specific as possible for a more tailored guidance.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
            >
              {error}
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}
