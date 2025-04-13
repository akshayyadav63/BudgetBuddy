import React from 'react';
import Sidebar from '../pages/SideBar'; // Make sure this path is correct
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
