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
  ArrowPathIcon
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

interface Roadmap {
  id: number;
  title: string;
  overview: string;
  skill_gap_analysis: { have: string[]; missing: string[] };
  confidence_score: number;
  coach_suggestions: string[];
  motivation: string;
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar: Progress & Skill Gap */}
      <div className="lg:col-span-4 space-y-6 sticky top-24">
        <div className="glass p-6 rounded-3xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl">Your Progress</h3>
            <span className="text-accent font-black text-2xl">{Math.round((roadmap.steps.filter(s => s.status === 'completed').length / roadmap.steps.length) * 100)}%</span>
          </div>
          
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(roadmap.steps.filter(s => s.status === 'completed').length / roadmap.steps.length) * 100}%` }}
              className="h-full bg-accent shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <ShieldCheckIcon className="w-5 h-5 text-accent" />
              Confidence Score: <span className="text-white font-bold">{roadmap.confidence_score}%</span>
            </div>
          </div>
        </div>

        {/* Skill Gap Analysis */}
        <div className="glass p-6 rounded-3xl space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <BeakerIcon className="w-5 h-5 text-emerald-400" />
            Skill Analysis
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">You Have</p>
              <div className="flex flex-wrap gap-2">
                {roadmap.skill_gap_analysis.have.map((s, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">You're Missing</p>
              <div className="flex flex-wrap gap-2">
                {roadmap.skill_gap_analysis.missing.map((s, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 bg-amber-500/10 text-amber-400 rounded-md border border-amber-500/20">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Coach Suggestions */}
        <div className="glass p-6 rounded-3xl bg-accent/5 border-accent/20">
          <h3 className="font-bold flex items-center gap-2 mb-3">
            <LightBulbIcon className="w-5 h-5 text-accent" />
            AI Coach Notes
          </h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            {roadmap.coach_suggestions.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent">•</span> {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content: Steps */}
      <div className="lg:col-span-8 space-y-8">
        {/* Step Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
          {roadmap.steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStepIdx(idx)}
              className={`shrink-0 px-6 py-3 rounded-2xl font-bold text-sm transition-all border ${
                activeStepIdx === idx 
                ? "bg-accent text-white border-accent shadow-lg shadow-accent/20" 
                : "bg-white/5 text-zinc-500 border-white/5 hover:border-white/20"
              }`}
            >
              Step {idx + 1}: {step.status === 'completed' && "✓"}
            </button>
          ))}
        </div>

        <motion.div
          key={activeStep?.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          {/* Active Step Card */}
          <div className="glass p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 ${
              activeStep.status === 'completed' ? "bg-emerald-500" : activeStep.status === 'stuck' ? "bg-red-500" : "bg-accent"
            }`} />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-black rounded-lg uppercase tracking-tighter">Phase {activeStepIdx + 1}</span>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg text-xs font-medium text-zinc-400">
                    <ClockIcon className="w-4 h-4" />
                    {activeStep.duration}
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-black">{activeStep.title}</h2>
              </div>
              
              <div className="flex items-center gap-3">
                {activeStep.status !== 'completed' ? (
                  <button 
                    onClick={() => updateStatus(activeStep.id, 'completed')}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                  >
                    <CheckCircleIcon className="w-5 h-5" /> Mark Complete
                  </button>
                ) : (
                  <div className="flex items-center gap-2 px-6 py-3 bg-emerald-500/10 text-emerald-400 rounded-xl font-bold border border-emerald-500/20">
                    <CheckCircleSolid className="w-5 h-5" /> Completed
                  </div>
                )}
                <button 
                  onClick={() => updateStatus(activeStep.id, activeStep.status === 'stuck' ? 'pending' : 'stuck')}
                  className={`p-3 rounded-xl transition-all border ${
                    activeStep.status === 'stuck' 
                    ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20" 
                    : "glass text-zinc-400 border-white/10 hover:text-red-400"
                  }`}
                  title="I'm Stuck"
                >
                  <ExclamationCircleIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            <p className="text-zinc-400 text-lg leading-relaxed mb-10 pb-8 border-b border-white/5">
              {activeStep.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="font-bold flex items-center gap-2 text-white">
                  <AcademicCapIcon className="w-5 h-5 text-accent" />
                  Actionable Tasks
                </h4>
                <div className="space-y-3">
                  {activeStep.tasks.map((task, i) => (
                    <button 
                      key={i}
                      onClick={() => toggleTask(activeStep.id, i)}
                      className="w-full flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all text-left"
                    >
                      {task.completed ? (
                        <CheckCircleSolid className="w-6 h-6 text-emerald-500 shrink-0" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-white/10 shrink-0" />
                      )}
                      <span className={`text-sm ${task.completed ? "text-zinc-500 line-through" : "text-zinc-300"}`}>{task.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-bold flex items-center gap-2 text-white">
                  <FlagIcon className="w-5 h-5 text-emerald-400" />
                  Mini Project
                </h4>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                  <h5 className="font-black text-accent">{activeStep.mini_project.title}</h5>
                  <p className="text-xs text-zinc-400">{activeStep.mini_project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {activeStep.mini_project.tools.map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-white/10 text-white rounded font-mono">{t}</span>
                    ))}
                  </div>
                  <div className="pt-2 text-[10px] text-emerald-400 font-bold uppercase tracking-widest italic">
                    Outcome: {activeStep.mini_project.outcome}
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Layer */}
            {activeStep.warnings && (
              <div className="mt-12 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3">
                <ExclamationCircleIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200/70 italic leading-relaxed">
                  <span className="font-bold text-amber-500 uppercase mr-1">Pro-Tip:</span>
                  {activeStep.warnings}
                </p>
              </div>
            )}
          </div>

          {/* Weekly Detail */}
          <div className="glass p-8 rounded-4xl space-y-6">
            <h3 className="text-xl font-bold">Weekly Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeStep.weekly_plan.map((week, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-xl space-y-2">
                  <p className="text-xs font-black text-accent uppercase">{week.week}</p>
                  <ul className="text-xs text-zinc-300 space-y-1">
                    {week.tasks.map((t, i) => (
                      <li key={i}>• {t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Regenerate Trigger */}
          {activeStep.status === 'stuck' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-red-500/10 border border-red-500/20 rounded-4xl flex flex-col items-center text-center gap-4"
            >
              <h3 className="text-xl font-bold text-red-400">Feeling Stuck?</h3>
              <p className="text-sm text-zinc-400 max-w-md">Our AI can adjust the roadmap based on your current roadblocks. Let's engineering a smoother path.</p>
              <button 
                onClick={onRegenerate}
                className="flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all shadow-xl shadow-red-500/20"
              >
                <ArrowPathIcon className="w-5 h-5" /> Adjust My Roadmap
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom Motivation */}
        <div className="text-center py-8">
          <p className="italic text-zinc-500 font-medium select-none">"{roadmap.motivation}"</p>
        </div>
      </div>
    </div>
  );
}
