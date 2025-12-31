
import { GoogleGenAI } from "@google/genai";
import { CertificateRecord } from "../types.ts";

export const getAIInsights = async (cert: CertificateRecord): Promise<string> => {
  let apiKey = null;
  try {
    if (typeof process !== 'undefined' && process.env) {
      apiKey = process.env.API_KEY;
    }
  } catch (e) {}

  if (!apiKey) {
    return "Verification key missing. Please check configuration.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `Analyze this certificate record and provide a brief professional summary of its compliance status and significance for international trade.
  
  Record Details:
  Certificate No: ${cert.certificateNo}
  Registration No: ${cert.registrationNo}
  Company: ${cert.companyName}
  Product: ${cert.productName}
  Issued On: ${cert.issuedOn}
  Valid Until: ${cert.validUntil}
  
  Keep it concise and professional.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No insights available at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI assistant is currently unavailable. Please verify manually.";
  }
};
