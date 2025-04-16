import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CreditCard, Calendar, Zap, Plus, Home, Coffee, Car, Film, Trash2, PieChart,
} from 'lucide-react';
import { useUser } from '../../context/userContext';
import { useTheme } from '../../context/themeContext'; // Import theme context

export default function Expense() {
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;
  const [recentExpenses, setRecentExpenses] = useState([]);
  const { userId } = useUser();
  const { darkMode } = useTheme(); // Access dark mode state from theme context

  const handleInputChange = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/get-expense/${userId}`);
      const expenses = Array.isArray(res.data) ? res.data : res.data.expense || [];
      setRecentExpenses(expenses);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };
  
  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = {
      title,
      amount: parseFloat(amount),
      date,
      category,
      description,
      userId,
    };

    try {
      await axios.post('http://localhost:5000/api/v1/add-expense', newExpense);
      await fetchExpenses();
      setInputState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding expense:", error.response?.data?.message || error.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/delete-expense/${id}`);
      setRecentExpenses((prev) => prev.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Delete failed:", error.response?.data?.message || error.message);
    }
  };

  const totalExpenses = Array.isArray(recentExpenses)
    ? recentExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0)
    : 0;

  const getCategoryStyle = (category = "") => {
    switch (category.toLowerCase()) {
      case "housing":
        return { bgColor: `bg-orange-100 ${darkMode ? 'dark:bg-orange-900' : ''}`, textColor: `text-orange-600 ${darkMode ? 'dark:text-orange-300' : ''}`, icon: <Home size={18} /> };
      case "food":
        return { bgColor: `bg-red-100 ${darkMode ? 'dark:bg-red-900' : ''}`, textColor: `text-red-600 ${darkMode ? 'dark:text-red-300' : ''}`, icon: <Coffee size={18} /> };
      case "utilities":
        return { bgColor: `bg-blue-100 ${darkMode ? 'dark:bg-blue-900' : ''}`, textColor: `text-blue-600 ${darkMode ? 'dark:text-blue-300' : ''}`, icon: <Zap size={18} /> };
      case "transportation":
        return { bgColor: `bg-indigo-100 ${darkMode ? 'dark:bg-indigo-900' : ''}`, textColor: `text-indigo-600 ${darkMode ? 'dark:text-indigo-300' : ''}`, icon: <Car size={18} /> };
      case "entertainment":
        return { bgColor: `bg-purple-100 ${darkMode ? 'dark:bg-purple-900' : ''}`, textColor: `text-purple-600 ${darkMode ? 'dark:text-purple-300' : ''}`, icon: <Film size={18} /> };
      case "other":
      default:
        return { bgColor: `bg-gray-100 ${darkMode ? 'dark:bg-gray-900' : ''}`, textColor: `text-gray-600 ${darkMode ? 'dark:text-gray-300' : ''}`, icon: <CreditCard size={18} /> };
    }
  };

  return (
    <div className={`h-screen w-full overflow-y-auto px-4 py-6 lg:pl-20 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'}`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Header */}
      <div className="mb-6">
        <div className={`flex items-center justify-between ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-md rounded-xl p-4`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900">
              <PieChart size={22} className="text-red-600 dark:text-red-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Expense Overview</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track your expenses</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
            <p className="text-xl font-semibold text-red-600 dark:text-red-300">${totalExpenses.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className={`rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Form Section */}
        <div className={`w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r ${darkMode ? 'border-gray-800' : 'border-gray-200'} p-6`}>
          <div className="flex items-center mb-6">
            <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg mr-3">
              <Plus size={18} className="text-red-600 dark:text-red-300" />
            </div>
            <h2 className="text-xl font-semibold">Add Expense</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleInputChange}
                placeholder="Enter title"
                className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-red-500`}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className={`text-gray-500 ${darkMode ? 'dark:text-gray-400' : ''}`}>$</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className={`w-full pl-8 px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-red-500`}
                  required
                />
              </div>
            </div>

            
              <div>
                <label className="text-sm font-medium mb-1 block">Date</label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-red-500`}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  onChange={handleInputChange}
                  placeholder="Enter category"
                  className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-red-500`}
                  required
                />
              </div>
           

            <div>
              <label className="text-sm font-medium mb-1 block">Description (optional)</label>
              <textarea
                name="description"
                value={description}
                onChange={handleInputChange}
                placeholder="Details about this expense"
                className={`w-full px-4 py-3 rounded-lg border min-h-24 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-red-500`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-red-600 hover:to-orange-700 transition-all"
            >
              <Plus size={18} className="inline mr-2" />
              Add Expense
            </button>
          </form>
        </div>

        {/* Transactions Section */}
        <div className={`w-full lg:w-2/3 p-6 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
          <div className="flex items-center mb-4">
            <Calendar size={18} className="text-red-600 mr-2" />
            <h2 className="text-xl font-semibold">Recent Expenses</h2>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2">
            {recentExpenses.length > 0 ? (
              recentExpenses.map((expense) => {
                const { bgColor, textColor, icon } = getCategoryStyle(expense.category);
                return (
                  <div
                    key={expense._id}
                    className={`p-4 rounded-xl flex justify-between items-center border hover:shadow-md transition ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
                  >
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full mr-3 ${bgColor}`}>
                        <span className={textColor}>{icon}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{expense.title}</h4>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {new Date(expense.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-red-600 dark:text-red-300 font-semibold text-md mr-4">
                        ${parseFloat(expense.amount).toFixed(2)}
                      </span>
                      <button
                        onClick={() => deleteExpense(expense._id)}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900 text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={`text-center py-12 rounded-xl border border-dashed ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`}>
                <CreditCard size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No expense transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}