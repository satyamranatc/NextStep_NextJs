"use client";

import { MapIcon } from "@heroicons/react/24/outline";

interface HistoryListProps {
  history: any[];
  onSelect: (roadmap: any) => void;
}

export default function HistoryList({ history, onSelect }: HistoryListProps) {
  if (history.length === 0) return null;

  return (
    <section id="history" className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Recent Guidance</h2>
          <div className="text-sm text-zinc-500">{history.length} roadmaps saved</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {history.slice(0, 6).map((item) => (
            <button 
              key={item.id}
              onClick={() => onSelect(item)}
              className="glass p-6 rounded-2xl text-left hover:border-accent/40 transition-all group"
            >
              <div className="mb-4 w-10 h-10 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <MapIcon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg mb-2 line-clamp-1">{item.title}</h4>
              <p className="text-sm text-zinc-400 line-clamp-2">{item.overview}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
