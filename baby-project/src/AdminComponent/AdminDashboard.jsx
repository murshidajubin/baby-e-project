import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const [productCounts, setProductCounts] = useState({
    Toys: 0,
    Boy: 0,
    deals: 0,
    total: 0,
  });
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = {
          users: "http://localhost:5002/users",
          products: "http://localhost:5002/Product",
        };
  
        const responses = await Promise.all(
          Object.values(urls).map((url) => fetch(url))
        );
  
        responses.forEach((response, index) => {
          if (!response.ok) {
            throw new Error(`Error fetching ${Object.keys(urls)[index]}: ${response.statusText}`);
          }
        });
  
        const [usersData, productsData] = await Promise.all(
          responses.map((res) => res.json())
        );
  
        // Filter based on categories
        const girlProducts = productsData.filter((item) => item.category === "Girl");
        const toyProducts = productsData.filter((item) => item.category === "Toys");
        const newArrivalProducts = productsData.filter((item) => item.category === "Newarrival");
  
        setProductCounts({
          girl: girlProducts.length,
          toys: toyProducts.length,
          newarrival: newArrivalProducts.length,
          total: productsData.length,
        });
  
        setUserCount(usersData.length);
      } catch (error) {
        console.error("Fetching error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  const chartData = [
    { name: "Girls", value: productCounts.girl },
    { name: "Toys", value: productCounts.toys },
    { name: "New Arrivals", value: productCounts.newarrival },
    { name: "Total Products", value: productCounts.total },
    { name: "Total Users", value: userCount },
  ];
  

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 flex flex-col space-y-4 fixed h-full">
        <h4 className="text-2xl font-bold text-white">Admin Panel</h4>
        <Link
          to="/admin/products"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2"
        >
          📦 <span>Manage Products</span>
        </Link>
        <Link
          to="/admin/users"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2"
        >
          👥 <span>Manage Users</span>
        </Link>
      </div>

      {/* Main Content - Full Screen */}
      <div className="ml-64 flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h1>
        <p className="text-center text-gray-300 mb-6">Track product and user trends.</p>

        {loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="w-full h-[85vh]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#fff" tick={{ fontSize: 14 }} />
                <YAxis stroke="#fff" tick={{ fontSize: 14 }} />
                <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
                <Legend wrapperStyle={{ color: "#fff", fontSize: "16px" }} iconSize={20} />

                
                <Line type="monotone" dataKey="value" stroke="#ff7300" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;