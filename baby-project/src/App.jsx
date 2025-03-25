import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Register from "./Registration/Register";
import Login from "./Registration/Login";
import Home from "./Pages/Home";
import Navbar from "./NavbarContext/Navbar";
import { AuthProvider } from "./Context/AuthContext";
import About from "./Pages/About";
import Boy from "./Pages/Boy"
import Girl from "./Pages/Girl";
import Skincare from "./Pages/Skincare";
import NewArrivals from "./Pages/Newarrival";
import Toys from "./Pages/Toys";
import Footer from "./Footer/Footer";
import Cart from "./Pages/Cart";
import Address from "./Orders/Address";
import OrderPage from "./Orders/OrderPage.jsx";




function App() {
  return (
     <AuthProvider>
    <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home"element={<Home/>}  />
          <Route path="/navbar"element={<Navbar/>}  />
          <Route path="/about"element={<About/>}  />
          <Route path="/boy"element={<Boy/>}  />
          <Route path="/girl"element={<Girl/>}  />
          <Route path="/skincare"element={<Skincare/>}  />
          <Route path="/newarrivals"element={<NewArrivals/>}  />
          <Route path="/toys"element={<Toys/>}  />
          <Route path="/footer"element={<Footer/>}  />
          <Route path="/cart"element={<Cart/>}  />
          <Route path="/address"element={<Address/>}  />
          <Route path="/orders"element={<OrderPage/>}  />
        
         

          



        </Routes>
      
    </Router>
    </AuthProvider>
  );
}

export default App;
