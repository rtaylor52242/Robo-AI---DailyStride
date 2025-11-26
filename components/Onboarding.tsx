import React, { useState } from 'react';
import { UserProfile, Gender } from '../types';
import { Ruler, Weight, User, Activity } from 'lucide-react';

interface OnboardingProps {
  onSave: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    age: 30,
    weight: 70,
    height: 170,
    gender: 'male',
    dailyStepGoal: 10000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
          <Activity size={40} className="text-slate-900" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Welcome to DailyStride</h1>
        <p className="text-slate-400">Let's set up your profile to accurately track your progress.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-300">Your Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              placeholder="e.g. Alex"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Age */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Age</label>
            <input
              type="number"
              required
              value={formData.age}
              onChange={e => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
           {/* Gender */}
           <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Gender</label>
            <select
              value={formData.gender}
              onChange={e => setFormData({ ...formData, gender: e.target.value as Gender })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-white appearance-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Weight */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Weight (kg)</label>
            <div className="relative">
              <Weight className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="number"
                required
                value={formData.weight}
                onChange={e => setFormData({ ...formData, weight: Number(e.target.value) })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          {/* Height */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Height (cm)</label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="number"
                required
                value={formData.height}
                onChange={e => setFormData({ ...formData, height: Number(e.target.value) })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Goal */}
        <div className="space-y-1 pt-2">
          <label className="text-sm font-medium text-slate-300">Daily Step Goal</label>
          <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
             <span className="text-2xl font-bold text-emerald-400">{formData.dailyStepGoal.toLocaleString()}</span>
             <input 
                type="range" 
                min="1000" 
                max="30000" 
                step="500"
                value={formData.dailyStepGoal}
                onChange={(e) => setFormData({...formData, dailyStepGoal: Number(e.target.value)})}
                className="w-1/2 accent-emerald-500 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
             />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-4 rounded-xl mt-6 transition-transform active:scale-95 shadow-lg shadow-emerald-500/20"
        >
          Start Walking
        </button>
      </form>
    </div>
  );
};