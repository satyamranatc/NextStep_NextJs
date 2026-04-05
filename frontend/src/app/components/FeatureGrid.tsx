import { AcademicCapIcon, ClockIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function FeatureGrid() {
  const features = [
    {
      title: "Personalized Learning",
      desc: "We analyze your unique background and goals to engineer a path that fits you.",
      proof: "→ Custom guidance in seconds",
      icon: <AcademicCapIcon className="w-6 h-6" />,
      color: "text-accent",
      border: "hover:border-accent/30"
    },
    {
      title: "Time-Efficient",
      desc: "Focus only on what matters. Our AI filters out redundant steps and 'tutorial hell'.",
      proof: "→ Save 100+ hours of research",
      icon: <ClockIcon className="w-6 h-6" />,
      color: "text-accent-secondary",
      border: "hover:border-accent-secondary/30"
    },
    {
      title: "Market-Aligned",
      desc: "Roadmaps stay updated with real-time industry trends and job market shifts.",
      proof: "→ Data-driven career choices",
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: "text-emerald-400",
      border: "hover:border-emerald-400/30"
    }
  ];

  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`feature-card group space-y-6 glass p-8 rounded-3xl border border-white/5 transition-all duration-500 hover:-translate-y-2 ${f.border} hover:shadow-2xl hover:shadow-accent/5`}
            >
              <div className={`w-14 h-14 glass rounded-2xl flex items-center justify-center ${f.color} group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">{f.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{f.desc}</p>
                <p className={`text-sm font-bold ${f.color} opacity-0 group-hover:opacity-100 transition-opacity`}>{f.proof}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
