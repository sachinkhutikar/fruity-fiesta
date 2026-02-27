import { GoogleGenAI, Type } from "@google/genai";
import { PredictionResult } from "../types";

const API_KEY = process.env.API_KEY || '';

export const analyzeFruitImage = async (base64Image: string): Promise<PredictionResult> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Analyze this fruit image for classification and quality detection. 
  1. Classify the fruit as Apple, Banana, or Orange.
  2. Determine if it is Fresh or Rotten.
  Return the confidence scores (0-100) for each category in the specified JSON format.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1] || base64Image,
            },
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          classification: {
            type: Type.OBJECT,
            properties: {
              apple: { type: Type.NUMBER },
              banana: { type: Type.NUMBER },
              orange: { type: Type.NUMBER },
            },
            required: ["apple", "banana", "orange"],
          },
          quality: {
            type: Type.OBJECT,
            properties: {
              fresh: { type: Type.NUMBER },
              rotten: { type: Type.NUMBER },
            },
            required: ["fresh", "rotten"],
          },
          detectedLabel: { type: Type.STRING },
          qualityLabel: { type: Type.STRING },
        },
        required: ["classification", "quality", "detectedLabel", "qualityLabel"],
      },
    },
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text) as PredictionResult;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Invalid response format from AI");
  }
};