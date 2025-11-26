import { GoogleGenAI } from "@google/genai";
import { UserProfile } from "../types";

// Initialize the API client
// Note: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDailyInsight = async (
  steps: number,
  calories: number,
  profile: UserProfile
): Promise<string> => {
  try {
    const prompt = `
      You are an enthusiastic fitness coach named RoboFit.
      
      User Stats for today:
      - Steps: ${steps} / Goal: ${profile.dailyStepGoal}
      - Calories Burned: ${calories}
      - User: ${profile.age} years old, ${profile.weight}kg.

      Task: Provide a ONE-SENTENCE, punchy, motivational insight or summary. 
      If they met the goal, celebrate wildly. 
      If they are close, push them. 
      If they are low, be gentle but encouraging.
      Use emojis.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Keep moving! Every step counts towards a healthier you. 🏃‍♂️";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Great job tracking your steps today! Keep it up! 💪";
  }
};
