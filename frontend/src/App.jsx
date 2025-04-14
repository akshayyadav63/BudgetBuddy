import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import DashboardLayout from './components/DashBoard/DashBoardLayout';
import Dashboard from './components/DashBoard/Dashboard';
import Income from './components/pages/income';
import Expense from './components/pages/expense';
import ViewTransaction from './components/pages/viewTransiction';
import Login from './components/Auth/login';
import Signup from './components/Auth/signup';
import { ThemeProvider } from './context/themeContext';

function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<Expense />} />
          <Route path="transactions" element={<ViewTransaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
