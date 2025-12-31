
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <i className="fas fa-shield-check text-xl"></i>
              </div>
              <span className="text-xl font-bold text-gray-800 tracking-tight">VerifyCert</span>
            </div>
            <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Query System</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Standards</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Help</a>
            </nav>
            <button className="md:hidden text-gray-500">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">© 2025 VerifyCert Compliance Systems. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-600"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-gray-600"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="text-gray-400 hover:text-gray-600"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
