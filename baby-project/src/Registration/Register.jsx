import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res= await axios.get("http://localhost:5002/users")
      const user=res.data.filter((val)=>val.email==form.email)
    if(user.length!=0){
     return alert('user already exist')
    }
      const response = await axios.post("http://localhost:5002/users", {
        name: form.name,
        email: form.email,
        password: form.password,
        cart:[]
      });
console.log(response.data);

      // console.log("User Registered:", response.data);
      alert("Registration successful!");

      
      navigate("/login");

      setForm({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Failed to register user.");
    }
  };

  
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-white">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        
        <div className="flex justify-center mb-4">
          <img
            src="https://mothersparsh.com/cdn/shop/files/new_logo_e3f4d18e-a9c0-43d9-b91a-5a1c154b1b93_1.png?v=1734756103&width=150"
            alt="Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white p-2 rounded-md hover:bg-green-800"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-green-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;