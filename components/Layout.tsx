import React from 'react';
import { AppView, UserProfile } from '../types';
import { LayoutDashboard, History, User, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  userProfile: UserProfile | null;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  onNavigate, 
  userProfile,
  onLogout 
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-slate-800">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-slate-900/90 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-800">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900">
                R
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            DailyStride
            </h1>
        </div>
        {userProfile && (
            <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400 hidden sm:block">Hi, {userProfile.name}</span>
                <img 
                    src={`https://picsum.photos/seed/${userProfile.name}/40/40`} 
                    alt="Avatar" 
                    className="w-8 h-8 rounded-full border border-slate-700"
                />
            </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-slate-800/95 backdrop-blur-md border-t border-slate-700 pb-safe z-30">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              currentView === 'dashboard' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard size={24} />
            <span className="text-[10px] mt-1 font-medium">Daily</span>
          </button>
          
          <button
            onClick={() => onNavigate('history')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              currentView === 'history' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <History size={24} />
            <span className="text-[10px] mt-1 font-medium">History</span>
          </button>

          <button
            onClick={onLogout}
            className="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-rose-400 transition-colors"
          >
            <LogOut size={24} />
            <span className="text-[10px] mt-1 font-medium">Reset</span>
          </button>
        </div>
      </nav>
    </div>
  );
};