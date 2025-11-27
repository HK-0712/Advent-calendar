import { GoogleGenAI, Type } from "@google/genai";
import { DayContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDayContent = async (day: number): Promise<DayContent> => {
  const prompt = `
    Create a fun, festive, and heartwarming Christmas content for Day ${day} of an Advent Calendar.
    Target audience: People in Hong Kong.
    Language: Traditional Chinese (Cantonese colloquialisms allowed but keep it elegant).
    
    Structure:
    1. A short festive title (4-8 chars).
    2. A heartwarming message or interesting Christmas fact (approx 30-50 words).
    3. A small suggestion or activity for today (e.g., "Drink hot chocolate", "Listen to a specific song").
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            message: { type: Type.STRING },
            activity: { type: Type.STRING },
          },
          required: ["title", "message", "activity"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");

    return JSON.parse(text) as DayContent;
  } catch (error) {
    console.error("Gemini generation failed:", error);
    // Fallback content in case of API failure
    return {
      title: `聖誕快樂 ${day}`,
      message: "聖誕節的魔力在於分享愛與歡樂。願你的每一天都充滿溫暖！(AI 連線稍慢，請稍後再試)",
      activity: "給朋友發送一個溫暖的問候吧！",
    };
  }
};
