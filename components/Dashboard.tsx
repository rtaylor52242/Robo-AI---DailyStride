import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';
import { getProgressPercentage } from '../utils/calculations';
import { Footprints, Flame, MapPin, Plus, Play, Pause, Sparkles, Wand2 } from 'lucide-react';
import { generateDailyInsight } from '../services/geminiService';

interface DashboardProps {
  steps: number;
  calories: number;
  distance: number;
  goal: number;
  userProfile: UserProfile;
  onAddSteps: (amount: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  steps,
  calories,
  distance,
  goal,
  userProfile,
  onAddSteps
}) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const percentage = getProgressPercentage(steps, goal);
  
  // Simulation interval ref
  // Changed from NodeJS.Timeout to number for browser compatibility
  const intervalRef = useRef<number | null>(null);

  // Circular progress calculation
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const toggleSimulation = () => {
    if (isSimulating) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsSimulating(false);
    } else {
      setIsSimulating(true);
      intervalRef.current = window.setInterval(() => {
        // Add random steps between 1 and 5 every 3000ms (was 800ms) to simulate walking
        const randomSteps = Math.floor(Math.random() * 5) + 1;
        onAddSteps(randomSteps);
      }, 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleGetInsight = async () => {
    setLoadingAi(true);
    const message = await generateDailyInsight(steps, calories, userProfile);
    setAiMessage(message);
    setLoadingAi(false);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      
      {/* AI Insight Card */}
      {aiMessage ? (
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 rounded-2xl border border-indigo-700 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 p-2 opacity-20">
                <Sparkles size={60} />
            </div>
            <div className="flex items-start gap-3 relative z-10">
                <div className="bg-indigo-500/20 p-2 rounded-lg">
                    <Wand2 className="text-indigo-300" size={20} />
                </div>
                <div>
                    <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">RoboFit Insight</h3>
                    <p className="text-sm font-medium text-white leading-relaxed">"{aiMessage}"</p>
                </div>
            </div>
        </div>
      ) : (
        <button 
            onClick={handleGetInsight}
            disabled={loadingAi}
            className="w-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 border-dashed rounded-xl p-3 flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-all group"
        >
            <Sparkles size={16} className={loadingAi ? "animate-spin" : "group-hover:scale-110 transition-transform"} />
            {loadingAi ? "Consulting AI..." : "Get Daily AI Motivation"}
        </button>
      )}

      {/* Main Progress Circle */}
      <div className="relative flex items-center justify-center py-4">
        {/* SVG Circle */}
        <div className="relative w-64 h-64">
           {/* Background Ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r={radius}
              stroke="currentColor"
              strokeWidth="16"
              fill="transparent"
              className="text-slate-800"
            />
            {/* Progress Ring */}
            <circle
              cx="128"
              cy="128"
              r={radius}
              stroke="currentColor"
              strokeWidth="16"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-emerald-500 transition-all duration-1000 ease-out"
            />
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-slate-400 font-medium text-sm uppercase tracking-widest mb-1">Steps</div>
            <div className="text-5xl font-black text-white tracking-tighter">
                {steps.toLocaleString()}
            </div>
            <div className="text-slate-500 text-sm font-medium mt-1">
                / {goal.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center shadow-md">
            <div className="bg-orange-500/20 p-2 rounded-full mb-2">
                <Flame className="text-orange-500" size={24} />
            </div>
            <span className="text-2xl font-bold text-white">{calories}</span>
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Kcal Burned</span>
        </div>

        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center shadow-md">
            <div className="bg-blue-500/20 p-2 rounded-full mb-2">
                <MapPin className="text-blue-500" size={24} />
            </div>
            <span className="text-2xl font-bold text-white">{distance}</span>
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">KM Distance</span>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase">Controls (Demo)</h3>
        
        <div className="flex gap-3">
             <button 
                onClick={toggleSimulation}
                className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    isSimulating 
                    ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50 hover:bg-amber-500/30' 
                    : 'bg-emerald-500 text-slate-900 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
                }`}
            >
                {isSimulating ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                {isSimulating ? "Pause Walk" : "Simulate Walk"}
            </button>

            <button 
                onClick={() => onAddSteps(500)}
                className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl px-4 flex items-center justify-center transition-colors"
                title="Add 500 Steps"
            >
                <Plus size={24} />
                <span className="sr-only">Add 500</span>
            </button>
        </div>
        <p className="text-xs text-slate-500 text-center">
            *Simulates pedometer activity since browser sensor API is limited without permission headers.
        </p>
      </div>
    </div>
  );
};