// src/components/Dashboard.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Sample transaction data for the chart
  const transactionData = [
    { date: '25/02/2023', income: 1500, expenses: 300 },
    { date: '21/02/2023', income: 8000, expenses: 3000 },
    { date: '18/01/2023', income: 1200, expenses: 800 },
    { date: '26/01/2023', income: 6000, expenses: 0 },
  ];

  // Sample recent transactions
  const recentTransactions = [
    { description: 'Dentist Appointment', amount: -120, type: 'expense' },
    { description: 'Travelling', amount: -3000, type: 'expense' },
    { description: 'From Freelance', amount: 1300, type: 'income' },
  ];

  // Sample totals
  const financialSummary = {
    totalIncome: 16500,
    totalExpenses: 3920,
    totalBalance: 12580,
    salarRange: { min: 1200, max: 8000 },
    expenseRange: { min: 120, max: 3000 }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-indigo-900 mb-6">All Transactions</h1>
      
      {/* Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={transactionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#22c55e" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
              name="Income"
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Expenses"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Financial Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Income */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-indigo-900 mb-4">Total Income</h2>
          <p className="text-4xl font-bold text-indigo-600">$ {financialSummary.totalIncome}</p>
        </div>
        
        {/* Total Expenses */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-indigo-900 mb-4">Total Expenses</h2>
          <p className="text-4xl font-bold text-indigo-600">$ {financialSummary.totalExpenses}</p>
        </div>
        
        {/* Total Balance */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-indigo-900 mb-4">Total Balance</h2>
          <p className="text-4xl font-bold text-green-500">$ {financialSummary.totalBalance}</p>
        </div>
      </div>
      
      {/* Two Column Layout: Recent History + Ranges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent History */}
        <div className="bg-white p-6 rounded-lg shadow-sm col-span-2">
          <h2 className="text-lg font-semibold text-indigo-900 mb-4">Recent History</h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <span className={transaction.type === 'income' ? 'text-green-500' : 'text-gray-700'}>
                  {transaction.description}
                </span>
                <span className={transaction.type === 'income' ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
                  {transaction.amount > 0 ? `+$${transaction.amount}` : `-$${Math.abs(transaction.amount)}`}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Range Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-6">
            <h3 className="text-center font-semibold text-indigo-900 mb-4">Salary</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Min</p>
                <p className="font-medium">${financialSummary.salarRange.min}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Max</p>
                <p className="font-medium">${financialSummary.salarRange.max}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-center font-semibold text-indigo-900 mb-4">Expense</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Min</p>
                <p className="font-medium">${financialSummary.expenseRange.min}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Max</p>
                <p className="font-medium">${financialSummary.expenseRange.max}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;