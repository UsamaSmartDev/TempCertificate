
import { GoogleGenAI } from "@google/genai";
import { CertificateRecord } from "../types";

export const getAIInsights = async (cert: CertificateRecord): Promise<string> => {
  // Always initialize GoogleGenAI with a named parameter for apiKey
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Fix: Removed cert.category, cert.status, and cert.authority which do not exist in CertificateRecord
  // Added valid properties: registrationNo, issuedOn, and validUntil
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
    // Correctly accessing the text property directly (not calling as a method)
    return response.text || "No insights available at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI assistant is currently unavailable. Please verify manually.";
  }
};
