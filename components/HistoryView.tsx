import React from 'react';
import { DailyData } from '../types';
import { HistoryChart } from './HistoryChart';
import { TrendingUp, Calendar, Trophy } from 'lucide-react';

interface HistoryViewProps {
  history: DailyData[];
  today: DailyData;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ history, today }) => {
  // Combine historical mock data with today's live data for the chart
  const combinedData = [...history, today];
  const totalSteps = combinedData.reduce((acc, curr) => acc + curr.steps, 0);
  const avgSteps = Math.floor(totalSteps / combinedData.length);
  const bestDay = combinedData.reduce((prev, current) => (prev.steps > current.steps) ? prev : current);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-1">Activity History</h2>
        <p className="text-slate-400 text-sm">Your performance over the last 7 days.</p>
      </div>

      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-md">
         <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-400" />
                Step Trends
            </h3>
         </div>
         <HistoryChart data={combinedData} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 flex items-center justify-between">
            <div>
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Weekly Average</p>
                <p className="text-3xl font-bold text-white">{avgSteps.toLocaleString()}</p>
                <p className="text-xs text-emerald-400 font-medium mt-1">steps / day</p>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-xl">
                <Calendar className="text-slate-400" size={28} />
            </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 flex items-center justify-between">
            <div>
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Best Day</p>
                <p className="text-3xl font-bold text-white">{bestDay.steps.toLocaleString()}</p>
                <p className="text-xs text-slate-500 font-medium mt-1">{new Date(bestDay.date).toLocaleDateString()}</p>
            </div>
            <div className="bg-yellow-500/10 p-3 rounded-xl border border-yellow-500/20">
                <Trophy className="text-yellow-500" size={28} />
            </div>
        </div>
      </div>
      
      {/* List view of history */}
      <div className="mt-6">
        <h3 className="font-bold text-slate-300 mb-3">Recent Logs</h3>
        <div className="space-y-3">
            {[...combinedData].reverse().slice(0, 5).map((log, idx) => (
                <div key={idx} className="bg-slate-800/50 p-3 rounded-xl flex items-center justify-between border border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-10 rounded-full ${log.steps >= 10000 ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                        <div>
                            <p className="font-bold text-slate-200">{new Date(log.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                            <p className="text-xs text-slate-400">{log.calories} kcal • {log.distance} km</p>
                        </div>
                    </div>
                    <span className="font-mono font-bold text-emerald-400">{log.steps.toLocaleString()}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};