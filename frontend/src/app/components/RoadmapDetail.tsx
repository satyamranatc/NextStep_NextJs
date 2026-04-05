"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  LightBulbIcon, 
  ClockIcon,
  AcademicCapIcon,
  BeakerIcon,
  ShieldCheckIcon,
  FlagIcon,
  ArrowPathIcon,
  BookOpenIcon,
  VideoCameraIcon,
  BuildingOfficeIcon,
  ExclamationTriangleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";
import { useState } from "react";

interface Step {
  id: number;
  title: string;
  description: string;
  duration: string;
  resources: string[];
  status: string;
  feedback?: string;
  tasks: { title: string; completed: boolean }[];
  mini_project: { title: string; description: string; tools: string[]; outcome: string };
  weekly_plan: { week: string; tasks: string[] }[];
  outcomes: string[];
  warnings: string;
  completion_criteria: string;
}

interface Company {
  name: string;
  avg_package: string;
}

interface Roadmap {
  id: number;
  title: string;
  overview: string;
  skill_gap_analysis: { have: string[]; missing: string[] };
  confidence_score: number;
  coach_suggestions: string[];
  motivation: string;
  best_books: string[];
  best_youtube_channels: string[];
  top_companies_india: Company[];
  popular_mistakes: string[];
  steps: Step[];
}

export default function RoadmapDetail({ roadmap, onUpdateStep, onRegenerate }: { 
  roadmap: Roadmap; 
  onUpdateStep: (stepId: number, update: any) => void;
  onRegenerate: () => void;
}) {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const toggleTask = (stepId: number, taskIdx: number) => {
    const step = roadmap.steps.find(s => s.id === stepId);
    if (!step) return;
    const newTasks = [...step.tasks];
    newTasks[taskIdx].completed = !newTasks[taskIdx].completed;
    onUpdateStep(stepId, { tasks: newTasks });
  };

  const updateStatus = (stepId: number, status: string) => {
    onUpdateStep(stepId, { status });
  };

  const activeStep = roadmap.steps[activeStepIdx];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Sidebar: Progress & Resources */}
      <div className="lg:col-span-4 space-y-8 sticky top-24">
        {/* Progress Card */}
        <div className="glass p-8 rounded-[2.5rem] space-y-8 border-white/10 bg-zinc-900/40">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-2xl tracking-tight">Progress</h3>
            <span className="text-accent font-black text-3xl">{Math.round((roadmap.steps.filter(s => s.status === 'completed').length / roadmap.steps.length) * 100)}%</span>
          </div>
          
          <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(roadmap.steps.filter(s => s.status === 'completed').length / roadmap.steps.length) * 100}%` }}
              className="h-full bg-linear-to-r from-accent to-accent-secondary shadow-[0_0_20px_rgba(139,92,246,0.4)]"
            />
          </div>

          <div className="space-y-4 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 text-sm font-bold text-zinc-400">
              <ShieldCheckIcon className="w-6 h-6 text-accent" />
              Confidence Score: <span className="text-white text-lg font-black">{roadmap.confidence_score}%</span>
            </div>
          </div>
        </div>

        {/* Skill Gap Analysis */}
        <div className="glass p-8 rounded-[2.5rem] space-y-6 border-white/10">
          <h3 className="font-black text-xl flex items-center gap-2">
            <BeakerIcon className="w-6 h-6 text-emerald-400" />
            Skill Gap
          </h3>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">You're Already Killing It In</p>
              <div className="flex flex-wrap gap-2">
                {roadmap.skill_gap_analysis.have.map((s, i) => (
                  <span key={i} className="text-[11px] font-bold px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">Time to Master These</p>
              <div className="flex flex-wrap gap-2">
                {roadmap.skill_gap_analysis.missing.map((s, i) => (
                  <span key={i} className="text-[11px] font-bold px-3 py-1.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Companies India */}
        <div className="glass p-8 rounded-[2.5rem] space-y-6 border-white/10 bg-blue-500/3">
          <h3 className="font-black text-xl flex items-center gap-2">
            <BuildingOfficeIcon className="w-6 h-6 text-blue-400" />
            Top Targets (India)
          </h3>
          <div className="space-y-3">
            {roadmap.top_companies_india.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/3 rounded-2xl border border-white/5 group hover:bg-white/5 transition-all">
                <span className="font-bold text-zinc-200">{c.name}</span>
                <span className="text-xs font-black text-blue-400 bg-blue-400/10 px-2 py-1 rounded-lg">Avg {c.avg_package}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-zinc-500 font-bold italic">Prices in LPA (Lakhs Per Annum)</p>
        </div>

        {/* Coach Suggestions */}
        <div className="glass p-8 rounded-[2.5rem] bg-accent/5 border-accent/20">
          <h3 className="font-black text-xl flex items-center gap-2 mb-4 text-white">
            <LightBulbIcon className="w-6 h-6 text-accent" />
            Mentor's Secret Tips
          </h3>
          <ul className="space-y-4 text-sm font-medium text-zinc-400">
            {roadmap.coach_suggestions.map((s, i) => (
              <li key={i} className="flex gap-3 leading-relaxed">
                <span className="text-accent text-lg">•</span> {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content: Steps & Resources */}
      <div className="lg:col-span-8 space-y-10">
        {/* Step Navigation Tabs */}
        <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar custom-scrollbar">
          {roadmap.steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStepIdx(idx)}
              className={`shrink-0 px-8 py-4 rounded-2xl font-black text-sm transition-all border transform hover:scale-105 active:scale-95 ${
                activeStepIdx === idx 
                ? "bg-accent text-white border-accent shadow-xl shadow-accent/20" 
                : "bg-white/5 text-zinc-500 border-white/5 hover:border-white/20"
              }`}
            >
              Phase {idx + 1} {step.status === 'completed' && "✓"}
            </button>
          ))}
        </div>

        <motion.div
          key={activeStep?.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          {/* Active Step Card */}
          <div className="glass p-10 md:p-16 rounded-[3rem] relative overflow-hidden bg-zinc-950/40 border border-white/10">
            <div className={`absolute top-0 right-0 w-64 h-64 blur-[120px] opacity-20 ${
              activeStep.status === 'completed' ? "bg-emerald-500" : activeStep.status === 'stuck' ? "bg-red-500" : "bg-accent"
            }`} />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="px-4 py-1.5 bg-accent/10 text-accent text-[10px] font-black rounded-xl uppercase tracking-widest border border-accent/20">Phase {activeStepIdx + 1}</span>
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-xl text-[10px] font-black text-zinc-400 border border-white/5 uppercase tracking-widest">
                    <ClockIcon className="w-4 h-4" />
                    {activeStep.duration}
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">{activeStep.title}</h2>
              </div>
              
              <div className="flex items-center gap-4">
                {activeStep.status !== 'completed' ? (
                  <button 
                    onClick={() => updateStatus(activeStep.id, 'completed')}
                    className="flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black hover:bg-emerald-600 transition-all active:scale-95 shadow-xl shadow-emerald-500/30"
                  >
                    <CheckCircleIcon className="w-6 h-6" /> Mark Complete
                  </button>
                ) : (
                  <div className="flex items-center gap-3 px-8 py-4 bg-emerald-500/10 text-emerald-400 rounded-2xl font-black border border-emerald-500/20">
                    <CheckCircleSolid className="w-6 h-6" /> Completed
                  </div>
                )}
                <button 
                  onClick={() => updateStatus(activeStep.id, activeStep.status === 'stuck' ? 'pending' : 'stuck')}
                  className={`p-4 rounded-2xl transition-all border ${
                    activeStep.status === 'stuck' 
                    ? "bg-red-500 text-white border-red-500 shadow-xl shadow-red-500/30" 
                    : "glass text-zinc-500 border-white/10 hover:text-red-400 hover:border-red-400/30"
                  }`}
                  title="I'm Stuck"
                >
                  <ExclamationCircleIcon className="w-7 h-7" />
                </button>
              </div>
            </div>

            <p className="text-zinc-400 text-xl font-medium leading-relaxed mb-12 pb-10 border-b border-white/5">
              {activeStep.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h4 className="font-black text-lg flex items-center gap-3 text-white uppercase tracking-widest font-mono">
                  <AcademicCapIcon className="w-6 h-6 text-accent" />
                  Mission Control
                </h4>
                <div className="space-y-4">
                  {activeStep.tasks.map((task, i) => (
                    <button 
                      key={i}
                      onClick={() => toggleTask(activeStep.id, i)}
                      className="w-full flex items-start gap-4 p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all text-left"
                    >
                      {task.completed ? (
                        <CheckCircleSolid className="w-7 h-7 text-emerald-500 shrink-0" />
                      ) : (
                        <div className="w-7 h-7 rounded-full border-2 border-white/10 shrink-0 bg-white/5" />
                      )}
                      <span className={`text-base font-medium ${task.completed ? "text-zinc-600 line-through" : "text-zinc-300"}`}>{task.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h4 className="font-black text-lg flex items-center gap-3 text-white uppercase tracking-widest font-mono">
                  <FlagIcon className="w-6 h-6 text-emerald-400" />
                  Boss Level: Mini Project
                </h4>
                <div className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/10 space-y-6 relative group/project overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-3xl opacity-0 group-hover/project:opacity-100 transition-opacity" />
                  <h5 className="font-black text-2xl text-accent-secondary">{activeStep.mini_project.title}</h5>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">{activeStep.mini_project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {activeStep.mini_project.tools.map((t, i) => (
                      <span key={i} className="text-[11px] font-black px-3 py-1 bg-white/5 text-zinc-300 rounded-lg border border-white/5">{t}</span>
                    ))}
                  </div>
                  <div className="pt-4 flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-widest italic">
                    <SparklesIcon className="w-4 h-4" />
                    Target Outcome: {activeStep.mini_project.outcome}
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Layer */}
            {activeStep.warnings && (
              <div className="mt-16 p-6 bg-amber-500/10 border border-amber-500/20 rounded-4xl flex items-start gap-4">
                <ExclamationCircleIcon className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                   <p className="font-black text-amber-500 uppercase tracking-widest text-xs">Don't Be a Noob!</p>
                   <p className="text-sm font-medium text-amber-200/60 italic leading-relaxed">
                    {activeStep.warnings}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* New Enriched Roadmap Sections (Global/Shared) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Best Books */}
            <div className="glass p-8 rounded-[2.5rem] space-y-6 border-white/10 bg-indigo-500/[0.03]">
              <h3 className="font-black text-xl flex items-center gap-2">
                <BookOpenIcon className="w-6 h-6 text-indigo-400" />
                Recommended Reading
              </h3>
              <ul className="space-y-3">
                {roadmap.best_books.map((book, i) => (
                  <li key={i} className="text-sm font-medium text-zinc-400 flex gap-3">
                    <span className="text-indigo-400 font-black">•</span> {book}
                  </li>
                ))}
              </ul>
            </div>

            {/* YouTube Channels */}
            <div className="glass p-8 rounded-[2.5rem] space-y-6 border-white/10 bg-red-500/[0.03]">
              <h3 className="font-black text-xl flex items-center gap-2">
                <VideoCameraIcon className="w-6 h-6 text-red-500" />
                Best YouTube Channels
              </h3>
              <ul className="space-y-3">
                {roadmap.best_youtube_channels.map((channel, i) => (
                  <li key={i} className="text-sm font-medium text-zinc-400 flex gap-3">
                    <span className="text-red-500 font-black">•</span> {channel}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Popular Mistakes */}
          <div className="glass p-10 rounded-[2.5rem] space-y-6 border-red-500/20 bg-red-500/[0.02]">
            <h3 className="font-black text-2xl flex items-center gap-3 text-white">
              <ExclamationTriangleIcon className="w-8 h-8 text-rose-500" />
              Common Pitfalls (Log Kya Kahenge?)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmap.popular_mistakes.map((mistake, i) => (
                <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-start gap-3">
                   <span className="text-rose-500 font-black">#{(i+1)}</span>
                   <p className="text-sm font-medium text-zinc-400 leading-relaxed">{mistake}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Detail */}
          <div className="glass p-10 rounded-[3rem] space-y-8 border-white/10">
            <h3 className="text-2xl font-black tracking-tight">The 4-Week Grind</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeStep.weekly_plan.map((week, idx) => (
                <div key={idx} className="p-6 bg-zinc-900/40 rounded-2xl border border-white/5 space-y-4 hover:border-accent/30 transition-all group">
                  <p className="text-xs font-black text-accent uppercase tracking-widest group-hover:scale-105 transition-transform">{week.week}</p>
                  <ul className="text-xs text-zinc-400 space-y-2 font-medium">
                    {week.tasks.map((t, i) => (
                      <li key={i} className="flex gap-2 leading-relaxed">• {t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Regenerate Trigger */}
          {activeStep.status === 'stuck' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 bg-red-500/10 border border-red-500/20 rounded-[3rem] flex flex-col items-center text-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white shadow-xl shadow-red-500/30">
                 <ExclamationCircleIcon className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black text-red-400">Arrey Beta, Phas Gaye?</h3>
              <p className="text-zinc-400 max-w-xl text-lg font-medium">Don't worry, even Sharma Ji ka beta gets stuck. Let's adjust your roadmap to get you back on track.</p>
              <button 
                onClick={onRegenerate}
                className="flex items-center gap-3 px-10 py-5 bg-red-500 text-white rounded-2xl font-black hover:bg-red-600 transition-all shadow-2xl shadow-red-500/40 active:scale-95"
              >
                <ArrowPathIcon className="w-6 h-6" /> Recalculate My Path
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom Motivation */}
        <div className="text-center py-20">
          <p className="italic text-zinc-500 text-xl font-black opacity-40 select-none tracking-tight">
            "{roadmap.motivation}"
          </p>
        </div>
      </div>
    </div>
  );
}
