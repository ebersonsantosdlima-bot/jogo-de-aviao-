
import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are a world-class Unity Game Developer specializing in Flight Simulators. 
Your goal is to generate high-quality, performant C# scripts for Unity (MonoBehaviour).
Focus on:
1. Realistic Flight Physics (Lift, Drag, Thrust, Weight).
2. Clean code with comments.
3. Unity-specific APIs (Rigidbody, Input System, Coroutines).
4. Mobile optimization for Android (low CPU overhead).
5. Code that is easy to drop into a Unity project.

Always wrap C# code in markdown code blocks.`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateFlightScript(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "Failed to generate script.";
  }

  async getWorkflowAdvice(task: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide step-by-step technical advice for: ${task}. Focus on the Unity to Android workflow.`,
      config: {
        systemInstruction: "You are a technical lead for mobile game deployment.",
      }
    });
    return response.text || "No advice available.";
  }
}

export const gemini = new GeminiService();
