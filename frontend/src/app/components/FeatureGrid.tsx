import { 
  AcademicCapIcon, 
  ClockIcon, 
  ChartBarIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function FeatureGrid() {
  const features = [
    {
      title: "Personalized Learning",
      desc: "We analyze your unique background and goals to engineer a path that fits you.",
      proof: "→ Custom guidance in seconds",
      icon: <AcademicCapIcon className="w-6 h-6" />,
      color: "text-accent",
      border: "hover:border-accent/30",
      shadow: "hover:shadow-accent/10"
    },
    {
      title: "Time-Efficient",
      desc: "Focus only on what matters. Our AI filters out redundant steps and 'tutorial hell'.",
      proof: "→ Save 100+ hours of research",
      icon: <ClockIcon className="w-6 h-6" />,
      color: "text-blue-400",
      border: "hover:border-blue-400/30",
      shadow: "hover:shadow-blue-400/10"
    },
    {
      title: "Market-Aligned",
      desc: "Roadmaps stay updated with real-time industry trends and job market shifts.",
      proof: "→ Data-driven career choices",
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: "text-emerald-400",
      border: "hover:border-emerald-400/30",
      shadow: "hover:shadow-emerald-400/10"
    }
  ];

  return (
    <section id="features" className="py-32 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Why NextStep?</h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-medium">We don't just give you a list; we give you a strategy built for the modern competitive landscape.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`feature-card group space-y-8 glass p-10 rounded-[2.5rem] border border-white/5 transition-all duration-500 hover:-translate-y-2 ${f.border} hover:shadow-2xl ${f.shadow} bg-zinc-900/20`}
            >
              <div className={`w-16 h-16 glass rounded-2xl flex items-center justify-center ${f.color} group-hover:scale-110 transition-transform duration-500`}>
                {f.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold text-white">{f.title}</h3>
                <p className="text-zinc-400 leading-relaxed font-medium transition-colors group-hover:text-zinc-300">{f.desc}</p>
                <div className="pt-4 flex items-center gap-2">
                   <p className={`text-sm font-black ${f.color} tracking-tight`}>{f.proof}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
