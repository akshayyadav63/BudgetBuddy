import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CreditCard, Calendar, Zap, Plus, Home, Coffee, Car, Film, Trash2, PieChart,
} from 'lucide-react';
import { useUser } from '../../context/userContext';

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
        return { bgColor: "bg-orange-100", textColor: "text-orange-600", icon: <Home size={18} /> };
      case "food":
        return { bgColor: "bg-red-100", textColor: "text-red-600", icon: <Coffee size={18} /> };
      case "utilities":
        return { bgColor: "bg-blue-100", textColor: "text-blue-600", icon: <Zap size={18} /> };
      case "transportation":
        return { bgColor: "bg-indigo-100", textColor: "text-indigo-600", icon: <Car size={18} /> };
      case "entertainment":
        return { bgColor: "bg-purple-100", textColor: "text-purple-600", icon: <Film size={18} /> };
      case "other":
      default:
        return { bgColor: "bg-gray-100", textColor: "text-gray-600", icon: <CreditCard size={18} /> };
    }
  };

  return (
    <div className="h-screen w-full overflow-y-auto px-4 py-6 lg:pl-20 bg-gray-100" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-100">
              <PieChart size={22} className="text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Expense Overview</h2>
              <p className="text-sm text-gray-500">Manage and track your expenses</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="text-xl font-semibold text-red-600">${totalExpenses.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Form Section */}
        <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="bg-red-100 p-2 rounded-lg mr-3">
              <Plus size={18} className="text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Add Expense</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleInputChange}
                placeholder="Expense Title"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={handleInputChange}
                  className="w-full pl-7 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Date</label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  onChange={handleInputChange}
                  placeholder="e.g. Housing"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Description (optional)</label>
              <textarea
                name="description"
                value={description}
                onChange={handleInputChange}
                placeholder="Details about this expense"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 min-h-24"
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
        <div className="w-full lg:w-2/3 p-6 bg-gray-50">
          <div className="flex items-center mb-4">
            <Calendar size={18} className="text-red-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Recent Expenses</h2>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2">
            {recentExpenses.length > 0 ? (
              recentExpenses.map((expense) => {
                const { bgColor, textColor, icon } = getCategoryStyle(expense.category);
                return (
                  <div
                    key={expense._id}
                    className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-gray-100 hover:shadow-md"
                  >
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full mr-3 ${bgColor}`}>
                        <span className={textColor}>{icon}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{expense.title}</h4>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {new Date(expense.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-red-600 font-semibold text-md mr-4">
                        ${parseFloat(expense.amount).toFixed(2)}
                      </span>
                      <button
                        onClick={() => deleteExpense(expense._id)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <CreditCard size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No expense transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}