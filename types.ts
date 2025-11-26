export type Gender = 'male' | 'female' | 'other';
export type AppView = 'dashboard' | 'history' | 'profile';

export interface UserProfile {
  name: string;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  gender: Gender;
  dailyStepGoal: number;
}

export interface DailyData {
  date: string;
  steps: number;
  calories: number;
  distance: number; // in km
}

export interface GeminiInsightResponse {
    message: string;
    tone: 'encouraging' | 'celebratory' | 'neutral';
}
