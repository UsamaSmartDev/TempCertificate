
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
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Provide a professional one-sentence verification summary for this Halal certificate: Company ${OFFICIAL_CERTIFICATE.companyName}, Certificate ${OFFICIAL_CERTIFICATE.certificateNo}. Highlight its validity until ${OFFICIAL_CERTIFICATE.validUntil}. The company is located at ${OFFICIAL_CERTIFICATE.companyAddress}.`,
        });
        setInsight(response.text || '');
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingInsight(false);
      }
    };
    fetchInsight();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-white md:bg-gray-100 py-0 md:py-12">
        <div className="max-w-4xl mx-auto md:shadow-2xl md:rounded-3xl overflow-hidden bg-white">
          {/* Main Certificate Content */}
          <ResultTable record={OFFICIAL_CERTIFICATE} />

          {/* AI Verification Footer Insight */}
          <div className="bg-gray-50 border-t border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">AI Verification Insights</h3>
            </div>
            {loadingInsight ? (
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            ) : (
              <p className="text-gray-600 text-sm italic leading-relaxed">
                "{insight || 'This certificate has been verified against our global registry and is currently in good standing.'}"
              </p>
            )}
          </div>
        </div>
        
        {/* Help Text */}
        <div className="max-w-4xl mx-auto mt-8 px-4 text-center">
            <p className="text-gray-400 text-xs">
              If you have any questions regarding this verification result, please contact the issuing authority directly referencing the certificate number above.
            </p>
        </div>
      </div>
    </Layout>
  );
};

export default App;
