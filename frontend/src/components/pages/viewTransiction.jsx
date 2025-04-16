import React, { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calendar, Download, Search, Filter, ChevronDown } from "lucide-react";
import { useTheme } from '../../context/themeContext'; // Import theme context
import { useUser } from "../../context/userContext";
import axios from "axios";

export default function TransactionView() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [timeFilter, setTimeFilter] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { darkMode } = useTheme(); 
  const {userId}=useUser();
  console.log(userId)

  const incomes= async (req,res)=>{
        try{
            const res= await axios.get(`http://localhost:5000/api/v1/get-income/${userId}`)
            const incomes = Array.isArray(res.data) ? res.data : res.data.incomes || [];
            return incomes;
        }catch(error){
          console.log("failed to fatch income data:",error);
          return [];
        }

  }

    const expense=async (req,res)=>{
      try{
        const res=await axios.get(`http://localhost:5000/api/v1/get-expense/${userId}`)
        const expense=Array.isArray(res.data)? res.data:res.data.expense||[];
        return expense;
      }catch(error){
        console.log("failed to fatch expense data:",error)
        return [];
      }
    }
  
    useEffect(() => {
      if (userId) {
        const fetchTransactions = async () => {
          try {
            const incomeData = await incomes();
            const expenseData = await expense();
            const combined = [...(incomeData || []), ...(expenseData || [])];
            setTransactions(combined);
            setFilteredTransactions(combined);
          } catch (error) {
            console.error("Error fetching transactions:", error);
          }
        };
    
        fetchTransactions();
      }
    }, [userId]);
    
  


  useEffect(() => {
    let filtered = [...transactions];
    
    
    if (typeFilter !== "all") {
      filtered = filtered.filter(t => t.type === typeFilter);
    }
    
   
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by date range
    if (startDate && endDate) {
      filtered = filtered.filter(t => 
        t.date >= startDate && t.date <= endDate
      );
    }
    
    setFilteredTransactions(filtered);
  }, [searchTerm, typeFilter, startDate, endDate, transactions]);

  // Prepare chart data based on time filter
  const getChartData = () => {
    const groupedData = {};
    
    filteredTransactions.forEach(transaction => {
      let key;
      
      // Group by day, month, or year
      if (timeFilter === "day") {
        key = transaction.date;
      } else if (timeFilter === "month") {
        key = transaction.date.substring(0, 7);
      } else {
        key = transaction.date.substring(0, 4); 
      }
      
      if (!groupedData[key]) {
        groupedData[key] = { date: key, income: 0, expense: 0, balance: 0 };
      }
      
      if (transaction.type === "income") {
        groupedData[key].income += transaction.amount;
      } else {
        groupedData[key].expense += Math.abs(transaction.amount);
      }
      
      groupedData[key].balance += transaction.amount;
    });
    
    return Object.values(groupedData);
  };

  const chartData = getChartData();

  // Download transactions as CSV
  const downloadTransactions = () => {
    const headers = ["Date", "Name", "Category", "Amount", "Type"];
    const csvContent = [
      headers.join(","),
      ...filteredTransactions.map(t => 
        [t.date, t.name, t.category, t.amount, t.type].join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `transactions_${new Date().toISOString().slice(0,10)}.csv`);
    link.click();
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Transaction History</h1>
        <div className="flex gap-2">
          <button 
            onClick={downloadTransactions}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-md p-6 mb-8`}>
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div className="flex gap-4 flex-wrap">
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-4 py-2 rounded-lg transition-colors`}
              >
                <Filter size={16} />
                <span>Filter: {typeFilter === "all" ? "All Transactions" : typeFilter === "income" ? "Income" : "Expenses"}</span>
                <ChevronDown size={16} />
              </button>
              
              {isFilterOpen && (
                <div className={`absolute top-full left-0 mt-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg z-10 w-48`}>
                  <ul>
                    <li 
                      className={`px-4 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer`}
                      onClick={() => {setTypeFilter("all"); setIsFilterOpen(false);}}
                    >
                      All Transactions
                    </li>
                    <li 
                      className={`px-4 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer`}
                      onClick={() => {setTypeFilter("income"); setIsFilterOpen(false);}}
                    >
                      Income
                    </li>
                    <li 
                      className={`px-4 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer`}
                      onClick={() => {setTypeFilter("expense"); setIsFilterOpen(false);}}
                    >
                      Expenses
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setTimeFilter("day")}
                className={`px-4 py-2 rounded-lg ${
                  timeFilter === "day" 
                    ? "bg-blue-600 text-white" 
                    : darkMode 
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
              >
                Daily
              </button>
              <button 
                onClick={() => setTimeFilter("month")}
                className={`px-4 py-2 rounded-lg ${
                  timeFilter === "month" 
                    ? "bg-blue-600 text-white" 
                    : darkMode 
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setTimeFilter("year")}
                className={`px-4 py-2 rounded-lg ${
                  timeFilter === "year" 
                    ? "bg-blue-600 text-white" 
                    : darkMode 
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
              >
                Yearly
              </button>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full`}
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>From:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar size={16} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>To:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-md p-6 mb-8`}>
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Financial Overview</h2>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
              <XAxis dataKey="date" stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
              <YAxis stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
              <Tooltip contentStyle={darkMode ? {backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB'} : undefined} />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
              <Line type="monotone" dataKey="balance" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-md p-6 flex-1`}>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Income vs Expenses</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="date" stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                <YAxis stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                <Tooltip contentStyle={darkMode ? {backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB'} : undefined} />
                <Legend />
                <Bar dataKey="income" fill="#10B981" name="Income" />
                <Bar dataKey="expense" fill="#EF4444" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Transactions Table */}
      <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-md p-6 mt-8`}>
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Transactions</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Date</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Title</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Category</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Amount</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Type</th>
              </tr>
            </thead>
            <tbody className={`${darkMode ? 'bg-gray-900' : 'bg-white'} divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className={darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.date}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{transaction.title}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.category}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    transaction.amount >= 0 ? "text-green-600" : "text-red-500"
                  }`}>
                    {transaction.amount >= 0 ? `+$${transaction.amount}` : `-$${Math.abs(transaction.amount)}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === "income" 
                        ? darkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800"
                        : darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-800"
                    }`}>
                      {transaction.type === "income" ? "Income" : "Expense"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTransactions.length === 0 && (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
}