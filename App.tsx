import React, { useState, useEffect } from 'react';
import { UserProfile, DailyData, AppView } from './types';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { HistoryView } from './components/HistoryView';
import { Layout } from './components/Layout';
import { calculateBurnedCalories, calculateDistance } from './utils/calculations';

// Mock initial data for history
const MOCK_HISTORY: DailyData[] = [
  { date: '2023-10-24', steps: 6500, calories: 250, distance: 4.2 },
  { date: '2023-10-25', steps: 8200, calories: 340, distance: 5.5 },
  { date: '2023-10-26', steps: 4500, calories: 180, distance: 3.1 },
  { date: '2023-10-27', steps: 11000, calories: 480, distance: 7.8 },
  { date: '2023-10-28', steps: 9500, calories: 410, distance: 6.5 },
  { date: '2023-10-29', steps: 12500, calories: 550, distance: 8.9 },
];

export default function App() {
  const [view, setView] = useState<AppView>('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // Today's live data
  const [todaySteps, setTodaySteps] = useState<number>(0);
  
  // Computed values
  const [todayCalories, setTodayCalories] = useState<number>(0);
  const [todayDistance, setTodayDistance] = useState<number>(0);

  // Load profile from local storage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('dailystride_profile');
    const savedSteps = localStorage.getItem('dailystride_today_steps');
    
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    if (savedSteps) {
      setTodaySteps(parseInt(savedSteps, 10));
    }
  }, []);

  // Update calculations when steps or profile changes
  useEffect(() => {
    if (userProfile) {
      const distance = calculateDistance(todaySteps, userProfile.height);
      const calories = calculateBurnedCalories(todaySteps, userProfile);
      
      setTodayDistance(distance);
      setTodayCalories(calories);
      
      // Persist steps
      localStorage.setItem('dailystride_today_steps', todaySteps.toString());
    }
  }, [todaySteps, userProfile]);

  const handleProfileSave = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('dailystride_profile', JSON.stringify(profile));
    setView('dashboard');
  };

  const handleResetProfile = () => {
    setUserProfile(null);
    setTodaySteps(0);
    localStorage.removeItem('dailystride_profile');
    localStorage.removeItem('dailystride_today_steps');
  };

  // If no profile, force onboarding
  if (!userProfile) {
    return <Onboarding onSave={handleProfileSave} />;
  }

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return (
          <Dashboard 
            steps={todaySteps} 
            calories={todayCalories} 
            distance={todayDistance}
            goal={userProfile.dailyStepGoal}
            userProfile={userProfile}
            onAddSteps={(amount) => setTodaySteps(prev => prev + amount)}
          />
        );
      case 'history':
        return <HistoryView history={MOCK_HISTORY} today={{
            date: new Date().toISOString().split('T')[0],
            steps: todaySteps,
            calories: todayCalories,
            distance: todayDistance
        }} />;
      default:
        return (
            <Dashboard 
            steps={todaySteps} 
            calories={todayCalories} 
            distance={todayDistance}
            goal={userProfile.dailyStepGoal}
            userProfile={userProfile}
            onAddSteps={(amount) => setTodaySteps(prev => prev + amount)}
          />
        );
    }
  };

  return (
    <Layout 
      currentView={view} 
      onNavigate={setView} 
      userProfile={userProfile}
      onLogout={handleResetProfile}
    >
      {renderView()}
    </Layout>
  );
}