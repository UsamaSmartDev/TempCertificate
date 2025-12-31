
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-green-100 selection:text-green-900">
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="flex items-center gap-2">
              <div className="bg-green-600 text-white p-1.5 rounded-md">
                <i className="fas fa-check-double text-sm"></i>
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">Official Verification Portal</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[11px] text-gray-400 uppercase tracking-widest">© 2025 Global Compliance Standards • Secure Digital Record</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
