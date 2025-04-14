import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  DollarSign, Calendar, Tag, Plus, Briefcase, ArrowUpCircle, Trash2, BarChart2,
} from 'lucide-react';
import { useUser } from '../../context/userContext';
import { useTheme } from '../../context/themeContext'; 

export default function Income() {
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;
  const [recentIncomes, setRecentIncomes] = useState([]);
  const { userId } = useUser();
  const { darkMode } = useTheme(); // <-- Access dark mode

  const handleInputChange = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const fetchIncomes = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/get-income/${userId}`);
      const incomes = Array.isArray(res.data) ? res.data : res.data.incomes || [];
      setRecentIncomes(incomes);
    } catch (error) {
      console.error("Failed to fetch incomes:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchIncomes();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newIncome = {
      title,
      amount: parseFloat(amount),
      date,
      category,
      description,
      userId,
    };

    try {
      await axios.post('http://localhost:5000/api/v1/add-income', newIncome);
      await fetchIncomes();
      setInputState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding income:", error.response?.data?.message || error.message);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/delete-income/${id}`);
      setRecentIncomes((prev) => prev.filter((income) => income._id !== id));
    } catch (error) {
      console.error("Delete failed:", error.response?.data?.message || error.message);
    }
  };

  const totalIncome = Array.isArray(recentIncomes)
    ? recentIncomes.reduce((sum, income) => sum + parseFloat(income.amount || 0), 0)
    : 0;

  const getCategoryStyle = (category = "") => {
    switch (category.toLowerCase()) {
      case "salary":
        return { bgColor: "bg-green-100 dark:bg-green-900", textColor: "text-green-600 dark:text-green-300", icon: <Briefcase size={18} /> };
      case "freelance":
        return { bgColor: "bg-purple-100 dark:bg-purple-900", textColor: "text-purple-600 dark:text-purple-300", icon: <ArrowUpCircle size={18} /> };
      case "investments":
        return { bgColor: "bg-yellow-100 dark:bg-yellow-900", textColor: "text-yellow-600 dark:text-yellow-300", icon: <Tag size={18} /> };
      case "other":
      default:
        return { bgColor: "bg-blue-100 dark:bg-blue-900", textColor: "text-blue-600 dark:text-blue-300", icon: <DollarSign size={18} /> };
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
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
              <BarChart2 size={22} className="text-green-600 dark:text-green-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Income Overview</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track your income</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
            <p className="text-xl font-semibold text-green-600 dark:text-green-300">${totalIncome.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className={`rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Form Section */}
        <div className={`w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r ${darkMode ? 'border-gray-800' : 'border-gray-200'} p-6`}>
          <div className="flex items-center mb-6">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
              <Plus size={18} className="text-green-600 dark:text-green-300" />
            </div>
            <h2 className="text-xl font-semibold">Add Income</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {["title", "amount", "date", "category"].map((field, i) => (
              <div key={i}>
                <label className="text-sm font-medium mb-1 block capitalize">{field}</label>
                <input
                  type={field === "amount" ? "number" : field === "date" ? "date" : "text"}
                  name={field}
                  value={inputState[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field}`}
                  className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-green-500`}
                  required
                />
              </div>
            ))}
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <textarea
                name="description"
                value={description}
                onChange={handleInputChange}
                placeholder="Details about this income"
                className={`w-full px-4 py-3 rounded-lg border min-h-24 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-green-500`}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all"
            >
              <Plus size={18} className="inline mr-2" />
              Add Income
            </button>
          </form>
        </div>

        {/* Transactions Section */}
        <div className={`w-full lg:w-2/3 p-6 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
          <div className="flex items-center mb-4">
            <Calendar size={18} className="text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">Recent Incomes</h2>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2">
            {recentIncomes.length > 0 ? (
              recentIncomes.map((income) => {
                const { bgColor, textColor, icon } = getCategoryStyle(income.category);
                return (
                  <div
                    key={income._id}
                    className={`p-4 rounded-xl flex justify-between items-center border hover:shadow-md transition ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
                  >
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full mr-3 ${bgColor}`}>
                        <span className={textColor}>{icon}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{income.title}</h4>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {new Date(income.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 dark:text-green-300 font-semibold text-md mr-4">
                        ${parseFloat(income.amount).toFixed(2)}
                      </span>
                      <button
                        onClick={() => deleteIncome(income._id)}
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
                <DollarSign size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No income transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}