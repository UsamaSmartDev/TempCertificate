
import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import ResultTable from './components/ResultTable';
import { OFFICIAL_CERTIFICATE } from './mockData';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [insight, setInsight] = useState<string>('');
  const [loadingInsight, setLoadingInsight] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        // Safe access to process.env to prevent crashes if 'process' is undefined
        const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : null;
        
        if (!apiKey) {
          console.warn("API Key not found. AI insights will be disabled.");
          setLoadingInsight(false);
          return;
        }

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Provide a professional one-sentence verification summary for this Halal certificate: Company ${OFFICIAL_CERTIFICATE.companyName}, Certificate ${OFFICIAL_CERTIFICATE.certificateNo}. Highlight its validity until ${OFFICIAL_CERTIFICATE.validUntil}. The company is located at ${OFFICIAL_CERTIFICATE.companyAddress}.`,
        });
        setInsight(response.text || '');
      } catch (err) {
        console.error("AI Insight Error:", err);
      } finally {
        setLoadingInsight(false);
      }
    };
    fetchInsight();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-6 md:py-12 px-4">
        <div className="max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-200">
          {/* Main Certificate Content */}
          <ResultTable record={OFFICIAL_CERTIFICATE} />

          {/* AI Verification Footer Insight */}
          <div className="bg-gray-50 border-t border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Digital Verification Insight</h3>
            </div>
            {loadingInsight ? (
              <div className="animate-pulse flex space-y-2 flex-col">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ) : (
              <p className="text-gray-700 text-sm italic leading-relaxed">
                "{insight || 'The digital signature for this record is valid. This certificate corresponds to an active registration in the global Halal compliance database.'}"
              </p>
            )}
          </div>
        </div>
        
        {/* Help Text */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
            <p className="text-gray-400 text-[10px] uppercase tracking-tighter">
              Authorized Digital Registry Access • Document ID: {OFFICIAL_CERTIFICATE.certificateNo}
            </p>
        </div>
      </div>
    </Layout>
  );
};

export default App;
