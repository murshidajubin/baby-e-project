import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaHome,
  FaPhone,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddressForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    mobile: "",
    optionalNumber: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [onlinePaymentOption, setOnlinePaymentOption] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    setCartItems(storedCart);
    const calculatedTotal = storedCart.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(calculatedTotal);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    setOnlinePaymentOption("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    for (const key in formData) {
      if (!formData[key]) {
        toast.error("Please fill all fields before placing the order.");
        return;
      }
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    if (paymentMethod === "Online" && !onlinePaymentOption) {
      toast.error("Please select an online payment option.");
      return;
    }

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: totalPrice,
      paymentMethod: paymentMethod === "COD" ? "Cash on Delivery" : onlinePaymentOption,
    };

    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));
    localStorage.removeItem("checkoutCart");

    toast.success("Order placed successfully!", {
      onClose: () => navigate("/orders"),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Delivery Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[{ name: "name", icon: <FaUser />, placeholder: "Full Name" },
            { name: "email", icon: <FaEnvelope />, placeholder: "Email Address", type: "email" },
            { name: "mobile", icon: <FaPhone />, placeholder: "Mobile Number" },
            { name: "optionalNumber", icon: <FaPhone />, placeholder: "Optional Number" },
            { name: "pincode", icon: <FaMapMarkerAlt />, placeholder: "Pincode" },
          ].map(({ name, icon, placeholder, type = "text" }) => (
            <div key={name} className="flex items-center border p-3 rounded-lg">
              {icon}
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full outline-none ml-2"
              />
            </div>
          ))}

          <div className="flex items-center border p-3 rounded-lg">
            <FaHome className="text-gray-500 mr-2" />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Delivery Address"
              className="w-full outline-none"
              rows="3"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button type="button" onClick={() => handlePaymentMethod("COD")} className={`w-1/2 p-3 font-bold rounded-lg flex items-center justify-center gap-2 ${paymentMethod === "COD" ? "bg-orange-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`}>
              <FaMoneyBillWave /> Cash on Delivery
            </button>
            <button type="button" onClick={() => handlePaymentMethod("Online")} className={`w-1/2 p-3 font-bold rounded-lg flex items-center justify-center gap-2 ${paymentMethod === "Online" ? "bg-blue-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
              <FaCreditCard /> Online Payment
            </button>
          </div>

          {paymentMethod === "Online" && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-bold text-gray-700 mb-2">Select Payment Method:</h3>
              <select className="w-full p-2 border rounded-lg" onChange={(e) => setOnlinePaymentOption(e.target.value)}>
                <option value="">Select Payment Option</option>
                <option value="upi">UPI</option>
                <option value="wallet">Wallet</option>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="netbanking">Net Banking</option>
              </select>
            </div>
          )}

          <button type="submit" className="w-full p-3 font-bold rounded-lg bg-blue-800 text-white hover:opacity-80">
            Place Order
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
