import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../NavbarContext/Navbar";
import Footer from "../Footer/Footer";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication(); 
    fetchCart();
  }, []);

 
  const checkAuthentication = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must be logged in to access the cart.");
      navigate("/login"); 
    }
  };

 
  const fetchCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const mergedCart = storedCart.reduce((acc, item) => {
      const existingItem = acc.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        acc.push({ ...item, quantity: item.quantity || 1 });
      }
      return acc;
    }, []);

    setCart(mergedCart);
    localStorage.setItem("cart", JSON.stringify(mergedCart));
  };

  
  const updateCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  
  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    updateCart(updatedCart);
  };

 
  const removeItem = (id) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      if (updatedCart[itemIndex].quantity > 1) {
        updatedCart[itemIndex].quantity -= 1;
      } else {
        updatedCart.splice(itemIndex, 1);
      }
    }
    updateCart(updatedCart);
  };

 
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

 
  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must be logged in to proceed to checkout.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    localStorage.setItem("checkoutCart", JSON.stringify(cart));
    navigate("/address");
  };

  return (
    <div className="container mx-auto p-6">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-6 border rounded-lg shadow-lg bg-white"
              >
                <div className="flex items-center space-x-6">
                  <img src={item.image} alt={item.name} className="w-28 h-28 object-contain rounded-lg" />

                  <div>
                    <h2 className="font-semibold text-xl">{item.name}</h2>
                    <p className="text-lg">
                      Price: {" "}
                      <span className="font-bold text-green-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-gray-300 px-3 py-1 rounded"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-gray-300 px-3 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="text-center mt-6">
            <h2 className="text-2xl font-bold">
              Total Amount: <span className="text-green-600">${totalAmount.toFixed(2)}</span>
            </h2>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-all duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
