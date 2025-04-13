import  React,{ useState } from 'react';
import { Wallet, ArrowRight, ChevronDown, Menu, X} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SimpleBudgetBuddyLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans">
      <div className="fixed inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 -z-10"></div>
      
 
      <div className="fixed top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-teal-100/20 to-emerald-200/10 rounded-bl-full -z-10 blur-3xl"></div>
      <div className="fixed bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-100/20 to-violet-200/10 rounded-tr-full -z-10 blur-3xl"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 px-6 lg:px-12 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-teal-200/50">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 font-bold text-2xl">Budget Buddy</span>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-gray-800 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/features" className="px-4 py-2 rounded-full text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all">Features</Link>
              <Link to="/about" className="px-4 py-2 rounded-full text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all">About</Link>
              <Link to="/contact" className="px-4 py-2 rounded-full text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all">Contact</Link>
              <Link to="/login" className="px-4 py-2 rounded-full text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all ml-2">Login</Link>
              <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full hover:shadow-lg hover:shadow-teal-200 transition-all">
                Get Started
              </Link>
            </div>
          </div>
          
          {/* Mobile navigation menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/90 backdrop-blur-md shadow-lg rounded-xl mt-4 py-4 absolute left-6 right-6 z-20">
              <div className="flex flex-col space-y-3 px-6">
                <Link to="/features" className="py-2 text-gray-800 hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>Features</Link>
                <Link to="/about" className="py-2 text-gray-800 hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link to="/contact" className="py-2 text-gray-800 hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                <Link to="/login" className="py-2 text-gray-800 hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="py-2 text-center mt-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="px-6 lg:px-12 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                <span className="bg-teal-600 w-2 h-2 rounded-full mr-2"></span>
                Simplify Your Finances
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Track Expenses <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Effortlessly</span>
              </h1>
              
              <p className="text-lg text-gray-600">
                Budget Buddy helps you manage your money with a simple, intuitive expense tracker that puts you in control of your finances.
              </p>
              
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <a href="#signup" className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-teal-200/50 transition-all flex items-center justify-center text-lg font-medium">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a href="#demo" className="px-8 py-3 bg-white text-teal-600 border border-teal-100 rounded-full hover:border-teal-200 hover:bg-teal-50 transition-all flex items-center justify-center text-lg font-medium">
                  See Demo
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-teal-100/50 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-100/50 rounded-full blur-xl"></div>
                
                {/* Main image with stylish border */}
                <div className="relative bg-white p-4 rounded-2xl shadow-xl backdrop-blur-sm border border-teal-100/50">
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="Budget Buddy Dashboard" 
                    className="rounded-xl shadow-inner"
                  />
                  
                  {/* Floating UI element */}
                  <div className="absolute -bottom-6 -right-6 bg-white py-2 px-4 rounded-xl shadow-lg flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      $
                    </div>
                    <p className="text-sm font-medium">
                      <span className="block text-gray-500 text-xs">Monthly Savings</span>
                      <span className="text-emerald-600">+$320.00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="px-6 lg:px-12 py-20 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Yet Powerful</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Budget Buddy gives you everything you need to track expenses without the complexity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-white to-teal-50/50 p-8 rounded-2xl shadow-lg border border-teal-100/30 hover:shadow-xl hover:shadow-teal-100/30 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Track Expenses</h3>
              <p className="text-gray-600">Easily log your daily expenses and categorize them for better financial awareness.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-white to-teal-50/50 p-8 rounded-2xl shadow-lg border border-teal-100/30 hover:shadow-xl hover:shadow-teal-100/30 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">View Reports</h3>
              <p className="text-gray-600">Get visual summaries of your spending patterns to help you make better financial decisions.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-white to-teal-50/50 p-8 rounded-2xl shadow-lg border border-teal-100/30 hover:shadow-xl hover:shadow-teal-100/30 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Save Time</h3>
              <p className="text-gray-600">Spend less time managing your finances and more time focusing on what matters to you.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* App Preview Section */}
      <section id="demo" className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See Budget Buddy in Action</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A simple, intuitive interface that makes expense tracking a breeze.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="relative max-w-4xl w-full">
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-teal-100/30 rounded-full blur-xl -z-10"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-100/30 rounded-full blur-xl -z-10"></div>
              
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-teal-100/30">
                <img 
                  src="/api/placeholder/800/500" 
                  alt="Budget Buddy Interface" 
                  className="rounded-xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="px-6 lg:px-12 py-20 bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-2/3 space-y-4">
              <h2 className="text-3xl font-bold">Ready to Take Control of Your Finances?</h2>
              <p className="text-teal-100 text-lg">
                Join Budget Buddy today and start your journey to financial clarity.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <a href="#signup" className="px-8 py-3 bg-white text-teal-600 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-lg font-medium">
                Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="px-6 lg:px-12 py-12 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center mr-2 shadow-sm shadow-teal-200/50">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 font-bold text-xl">Budget Buddy</span>
            </div>
            
            <div className="flex gap-4 md:gap-8">
              <a href="#features" className="text-gray-600 hover:text-teal-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-teal-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-teal-600 transition-colors">Contact</a>
              <a href="#privacy" className="text-gray-600 hover:text-teal-600 transition-colors">Privacy</a>
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-teal-100 hover:text-teal-600 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-teal-100 hover:text-teal-600 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-teal-100 hover:text-teal-600 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>© 2025 Budget Buddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}