// import axios from "axios";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit =async (e) => {
//     e.preventDefault();
//     if (!form.email || !form.password) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     // console.log("User Logged In:", form);

//     // // Define an admin email (For now, hardcoded)
//     const adminEmail = "admin@gmail.com";
//  const adminPassword='9898'
//     // // Save user info in local storage
  

//     // // Check if the logged-in user is an admin
//     if (form.email === adminEmail&&adminPassword==form.password) {

//       alert("Admin Login Successful!");
//       navigate("/admin-dashboard"); // Redirect to admin dashboard
//     } else {
//       const response=await axios.get(`http://localhost:5002/users`)
//       const user=response.data.filter((val)=>val.email==form.email&&val.password==form.password)
//       if(user.length==0){
//        return alert ('incorrect password')
//       }

// console.log(user[0])
// localStorage.setItem("id",user[0].id)
//    localStorage.setItem("user", JSON.stringify(form));
// navigate("/")
 
//     }
//   };
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white w-full">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        
//          <div className="flex justify-center mb-4">
//           <img
//             src="https://mothersparsh.com/cdn/shop/files/new_logo_e3f4d18e-a9c0-43d9-b91a-5a1c154b1b93_1.png?v=1734756103&width=150"
//             alt="Logo"
//             className="w-24 h-24 object-contain"
//           />
//         </div>
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-600">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               autoComplete="off"
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               autoComplete="off"
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-700 text-white p-2 rounded-md hover:bg-green-800"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-center text-gray-600">
//           Don't have an account? <Link to="/Register" className="text-blue-500 hover:underline">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.warn("Please fill in all fields.");
      return;
    }

    const adminEmail = "admin@gmail.com";
    const adminPassword = "9898";

    if (form.email === adminEmail && adminPassword === form.password) {
      toast.success("Admin Login Successful!");
      setTimeout(() => navigate("/admin-dashboard"), 1500);
    } else {
      try {
        const response = await axios.get(`http://localhost:5002/users`);
        const user = response.data.find(
          (val) => val.email === form.email && val.password === form.password
        );

        if (!user) {
          return toast.error("Incorrect email or password");
        }

        if (user.blocked) {
          return toast.error("Your account has been blocked. Please contact admin.");
        }

        localStorage.setItem("id", user.id);
        localStorage.setItem("user", JSON.stringify(form));
        toast.success("Login successful!");
        setTimeout(() => navigate("/"), 1500);
      } catch (err) {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white w-full">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">

        <div className="flex justify-center mb-4">
          <img
            src="https://mothersparsh.com/cdn/shop/files/new_logo_e3f4d18e-a9c0-43d9-b91a-5a1c154b1b93_1.png?v=1734756103&width=150"
            alt="Logo"
            className="w-24 h-24 object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="off"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              autoComplete="off"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white p-2 rounded-md hover:bg-green-800"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/Register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Login;

