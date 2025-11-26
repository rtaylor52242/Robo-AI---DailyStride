import { UserProfile } from "../types";

// Estimate stride length based on height and gender (approximations)
export const getStrideLengthMeters = (heightCm: number): number => {
  // Average stride length is roughly 41-43% of height
  return (heightCm * 0.415) / 100;
};

export const calculateDistance = (steps: number, heightCm: number): number => {
  const strideMeters = getStrideLengthMeters(heightCm);
  const distanceKm = (steps * strideMeters) / 1000;
  return parseFloat(distanceKm.toFixed(2));
};

export const calculateBurnedCalories = (steps: number, profile: UserProfile): number => {
  const { weight, height } = profile;
  
  // Simple factor based estimation:
  // Calories = Steps * (Stride Length in meters) * (Weight in kg) * 1.036 / 1000
  // Source: A common approximation formula for walking
  
  const strideMeters = getStrideLengthMeters(height);
  
  // Base calculation
  let calories = (steps * strideMeters * weight * 1.036) / 1000;
  
  // Adjust slightly for age (metabolism slows down) - this is a heuristic tweak
  // BMR decreases roughly 2% per decade after 20. 
  // We aren't calculating full TDEE here, just the "Active Calories" from walking.
  // We'll leave the raw physics calculation as the baseline for "active burn".
  
  return Math.floor(calories);
};

export const getProgressPercentage = (current: number, goal: number): number => {
    if (goal === 0) return 0;
    return Math.min(Math.round((current / goal) * 100), 100);
};