import React, { useState } from 'react';
import { BarChart, CreditCard, TrendingUp, DollarSign, LogOut, Moon, Sun } from 'lucide-react';
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  // Theme classes
  const sidebarClasses = darkMode 
    ? "bg-gray-900 text-white" 
    : "bg-white text-gray-800";
    
  const activeClasses = darkMode
    ? "bg-indigo-900/30 text-indigo-300 border-indigo-400" 
    : "bg-indigo-50 text-indigo-700 border-indigo-600";
    
  const menuItemClasses = darkMode
    ? "text-gray-300 hover:bg-gray-800" 
    : "text-gray-700 hover:bg-gray-50";
    
  const iconClasses = darkMode 
    ? "text-gray-400" 
    : "text-gray-500";
    
  const dividerClasses = darkMode
    ? "from-gray-900 via-gray-700 to-gray-900"
    : "from-white via-gray-200 to-white";
    
  return (
    <div className="h-screen flex">
      {/* Shadow container with margin to separate from background */}
      <div className={`h-full my-4 ml-4 rounded-xl shadow-lg w-64 overflow-hidden flex flex-col transition-colors duration-300 ${sidebarClasses}`}>
        {/* Profile Section */}
        <div className={`flex items-center p-6 pb-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-indigo-100'} flex items-center justify-center overflow-hidden mr-3 border-2 ${darkMode ? 'border-gray-700' : 'border-indigo-200'} shadow-sm`}>
            <img src={avatar} alt="User avatar" className="object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Mike</h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-500"} >Your Money</p>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex-grow mt-2 px-3">
          <nav>
            <ul className="space-y-1">
              <li>
                <Link to="/dashboard" className={`flex items-center py-3 px-4 rounded-lg border-l-4 shadow-sm ${activeClasses}`}>
                  <BarChart className="mr-3" size={18} />
                  <span className="font-medium">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/transactions" className={`flex items-center py-3 px-4 rounded-lg hover:shadow-sm transition-all duration-200 ${menuItemClasses}`}>
                  <CreditCard className={`mr-3 ${iconClasses}`} size={18} />
                  <span>View Transactions</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/income" className={`flex items-center py-3 px-4 rounded-lg hover:shadow-sm transition-all duration-200 ${menuItemClasses}`}>
                  <TrendingUp className={`mr-3 ${iconClasses}`} size={18} />
                  <span>Incomes</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/expense" className={`flex items-center py-3 px-4 rounded-lg hover:shadow-sm transition-all duration-200 ${menuItemClasses}`}>
                  <DollarSign className={`mr-3 ${iconClasses}`} size={18} />
                  <span>Expenses</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Theme Toggle */}
        <div className="px-3 mt-2">
          <button 
            onClick={toggleTheme}
            className={`flex items-center justify-between w-full py-3 px-4 rounded-lg hover:shadow-sm transition-all duration-200 ${menuItemClasses}`}
          >
            <span className="flex items-center">
              {darkMode ? 
                <Sun className="mr-3 text-yellow-400" size={18} /> : 
                <Moon className="mr-3 text-indigo-400" size={18} />
              }
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </span>
            <div className={`w-10 h-5 rounded-full flex items-center ${darkMode ? 'bg-indigo-600' : 'bg-gray-300'} px-0.5`}>
              <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </button>
        </div>
        
        {/* Bottom section with gradient divider */}
        <div className="mt-auto">
          <div className={`h-px bg-gradient-to-r ${dividerClasses} mx-6 my-2`}></div>
          <div className="px-3 pb-6">
            <a href="#" className={`flex items-center py-3 px-4 rounded-lg hover:shadow-sm transition-all duration-200 ${darkMode ? 'hover:bg-red-900/30 hover:text-red-300' : 'hover:bg-red-50 hover:text-red-600'}`}>
              <LogOut className={`mr-3 ${iconClasses}`} size={18} />
              <span>Sign Out</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}