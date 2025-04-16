import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  CreditCard
} from 'lucide-react';
import { useTheme } from '../../context/themeContext'; // Import theme context

// Sample data for the chart
const chartData = [
  { date: '25/02/2023', income: 1500, expenses: 300 },
  { date: '21/02/2023', income: 8000, expenses: 3000 },
  { date: '18/01/2023', income: 1200, expenses: 800 },
  { date: '26/01/2023', income: 6000, expenses: 200 },
];

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-3 border shadow-lg rounded-md`}>
        <p className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{label}</p>
        <p className="text-sm text-green-500">Income: ${payload[0].value}</p>
        <p className="text-sm text-red-500">Expenses: ${payload[1].value}</p>
      </div>
    );
  }
  return null;
};

// Transaction history component
const RecentHistory = ({ darkMode }) => {
  const transactions = [
    { name: "Dentist Appointment", amount: -120, date: "Apr 10", icon: <CreditCard className="text-blue-500" size={20} /> },
    { name: "Travelling", amount: -3000, date: "Apr 8", icon: <CreditCard className="text-purple-500" size={20} /> },
    { name: "From Freelance", amount: 1300, date: "Apr 5", icon: <DollarSign className="text-green-500" size={20} /> }
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300`}>
      <h2 className={`text-xl font-bold ${darkMode ? 'text-purple-300' : 'text-purple-900'} mb-4 flex items-center`}>
        <Calendar size={20} className={`mr-2 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`} />
        Recent History
      </h2>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div key={index} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} rounded-lg transition-colors duration-200`}>
            <div className="flex items-center">
              <div className={`mr-3 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-2 rounded-full shadow-sm`}>
                {transaction.icon}
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{transaction.name}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.date}</p>
              </div>
            </div>
            <span className={`font-semibold ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}>
              {transaction.amount > 0 ? `+$${Math.abs(transaction.amount)}` : `-$${Math.abs(transaction.amount)}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Min-Max component
const MinMaxCard = ({ title, min, max, icon, darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300`}>
      <div className="flex justify-between items-center mb-4">
        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Min</span>
        <span className={`text-xl font-bold ${darkMode ? 'text-purple-300' : 'text-purple-900'} flex items-center`}>
          {icon}
          <span className="ml-2">{title}</span>
        </span>
        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Max</span>
      </div>
      <div className="flex justify-between items-center">
        <span className={`${darkMode ? 'text-gray-300 bg-gray-700' : 'text-gray-700 bg-gray-100'} font-semibold px-3 py-1 rounded-lg`}>${min}</span>
        <div className={`h-1 flex-1 mx-4 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full`}>
          <div className="h-1 bg-purple-500 rounded-full" style={{ width: '70%' }}></div>
        </div>
        <span className={`${darkMode ? 'text-gray-300 bg-gray-700' : 'text-gray-700 bg-gray-100'} font-semibold px-3 py-1 rounded-lg`}>${max}</span>
      </div>
    </div>
  );
};

// Stats card component
const StatsCard = ({ title, value, icon, color, darkMode }) => {
  // Adapt border colors for dark mode
  const getBorderColor = () => {
    if (color === 'border-green-500') {
      return darkMode ? 'border-green-600' : 'border-green-500';
    } else if (color === 'border-red-500') {
      return darkMode ? 'border-red-600' : 'border-red-500';
    }
    return color;
  };

  // Adapt background colors for dark mode
  const getBgColor = () => {
    if (color.includes('green')) {
      return darkMode ? 'bg-green-800' : 'bg-green-100'; 
    } else if (color.includes('red')) {
      return darkMode ? 'bg-red-800' : 'bg-red-100';
    }
    return '';
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 ${getBorderColor()}`}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>{title}</h2>
          <p className={`text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>${value}</p>
        </div>
        <div className={`p-3 rounded-full bg-opacity-20 ${getBgColor()}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const { darkMode } = useTheme(); // Access dark mode from theme context

  return (
    <div className={`h-screen flex ${darkMode 
      ? 'bg-gradient-to-br from-gray-900 to-gray-950' 
      : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      
      {/* Main Content */}
      <div
        className="flex-1 overflow-y-auto p-6"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Center Part */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* Transactions Chart */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300`}>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-purple-300' : 'text-purple-900'} mb-6 flex items-center`}>
                <TrendingUp size={24} className={`mr-2 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`} />
                All Transactions
              </h1>
              <div className="h-64 md:h-80 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#333' : '#f0f0f0'} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12, fill: darkMode ? '#ccc' : '#333' }} 
                      stroke={darkMode ? '#555' : '#ccc'}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: darkMode ? '#ccc' : '#333' }} 
                      stroke={darkMode ? '#555' : '#ccc'}
                    />
                    <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 6, strokeWidth: 2, fill: darkMode ? "#333" : "#fff" }}
                      activeDot={{ r: 8, strokeWidth: 0, fill: "#10b981" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#ef4444"
                      strokeWidth={3}
                      dot={{ r: 6, strokeWidth: 2, fill: darkMode ? "#333" : "#fff" }}
                      activeDot={{ r: 8, strokeWidth: 0, fill: "#ef4444" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatsCard
                title="Total Income"
                value="16,500"
                icon={<TrendingUp size={24} className="text-green-500" />}
                color="border-green-500"
                darkMode={darkMode}
              />
              <StatsCard
                title="Total Expenses"
                value="3,920"
                icon={<TrendingDown size={24} className="text-red-500" />}
                color="border-red-500"
                darkMode={darkMode}
              />
            </div>

            {/* Balance Summary */}
            <div className={`${darkMode 
              ? 'bg-gradient-to-r from-purple-800 to-indigo-900' 
              : 'bg-gradient-to-r from-purple-600 to-indigo-600'} rounded-xl p-2 shadow-lg text-white`}>
              <h2 className="text-lg font-medium text-purple-100 mb-2">Total Balance</h2>
              <div className="flex items-center">
                <DollarSign size={32} className="mr-2" />
                <p className="text-xl font-bold">12,580</p>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm text-black bg-white bg-opacity-20 px-2 py-1 rounded-md mr-2">+76% from last month</span>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-1/3 space-y-4">
            <RecentHistory darkMode={darkMode} />

            <MinMaxCard
              title="Salary"
              min="1,200"
              max="8,000"
              icon={<DollarSign size={18} className="text-green-500" />}
              darkMode={darkMode}
            />

            <MinMaxCard
              title="Expense"
              min="120"
              max="3,000"
              icon={<CreditCard size={18} className="text-red-500" />}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;