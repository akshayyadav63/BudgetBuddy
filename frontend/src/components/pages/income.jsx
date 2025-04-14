import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  DollarSign, Calendar, Tag, Plus, Briefcase, ArrowUpCircle, Trash2, BarChart2,
} from 'lucide-react';
import { useUser } from '../../context/userContext';

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
        return { bgColor: "bg-green-100", textColor: "text-green-600", icon: <Briefcase size={18} /> };
      case "freelance":
        return { bgColor: "bg-purple-100", textColor: "text-purple-600", icon: <ArrowUpCircle size={18} /> };
      case "investments":
        return { bgColor: "bg-yellow-100", textColor: "text-yellow-600", icon: <Tag size={18} /> };
      case "other":
      default:
        return { bgColor: "bg-blue-100", textColor: "text-blue-600", icon: <DollarSign size={18} /> };
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
            <div className="p-2 rounded-full bg-green-100">
              <BarChart2 size={22} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Income Overview</h2>
              <p className="text-sm text-gray-500">Manage and track your income</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Income</p>
            <p className="text-xl font-semibold text-green-600">${totalIncome.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Form Section */}
        <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <Plus size={18} className="text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Add Income</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleInputChange}
                placeholder="Income Title"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
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
                  className="w-full pl-7 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
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
                  placeholder="e.g. Salary"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
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
                placeholder="Details about this income"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 min-h-24"
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
        <div className="w-full lg:w-2/3 p-6 bg-gray-50">
          <div className="flex items-center mb-4">
            <Calendar size={18} className="text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2">
            {recentIncomes.length > 0 ? (
              recentIncomes.map((income) => {
                const { bgColor, textColor, icon } = getCategoryStyle(income.category);
                return (
                  <div
                    key={income._id}
                    className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-gray-100 hover:shadow-md"
                  >
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full mr-3 ${bgColor}`}>
                        <span className={textColor}>{icon}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{income.title}</h4>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {new Date(income.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 font-semibold text-md mr-4">
                        ${parseFloat(income.amount).toFixed(2)}
                      </span>
                      <button
                        onClick={() => deleteIncome(income._id)}
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
                <DollarSign size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No income transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
