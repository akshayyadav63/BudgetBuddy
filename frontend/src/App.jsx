import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/pages/SideBar';
import Income from './components/pages/income';
import Expense from './components/pages/expense';
import ViewTransaction from './components/pages/viewTransiction';
import Dashboard from './components/DashBoard/DashBoard';


export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
          <Routes>
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/transactions" element={<ViewTransaction />} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
      
      </div>
    </BrowserRouter>
  );
}




// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Income from './components/pages/income';
// import Expense from './components/pages/expense';
// import ViewTransaction from './components/pages/viewTransiction';
// import Dashboard from './components/DashBoard/DashBoard';



// export default function App() {
//   return (
   
//           <Routes>
//             <Route path="/income" element={<Income />} />
//             <Route path="/expense" element={<Expense />} />
//             <Route path="/transactions" element={<ViewTransaction />} />
//             <Route path="/dashboard" element={<Dashboard/>} />
//           </Routes>
        
//   );
// }
