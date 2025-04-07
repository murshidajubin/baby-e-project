import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-500 text-black fixed">
      <h2 className="text-2xl font-bold  text-center py-4">Admin Panel</h2>
      <nav className="flex flex-col space-y-4 px-4">
        <Link to="/admin-dashboard" className="p-2 bg-sky-100 rounded hover:bg-sky-600">Dashboard</Link>
        <Link to="/product-manage" className="p-2 bg-sky-100 rounded hover:bg-sky-600">Product Management</Link>
        <Link to="/admin/users" className="p-2 bg-sky-100 rounded hover:bg-sky-600">User Management</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
