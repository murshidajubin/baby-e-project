import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import AuthContext from "../Context/AuthContext";
import { useContext } from "react";
import Navbar from "../NavbarContext/Navbar";
import Footer from "../Footer/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide } from "react-toastify";

const Toys = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios.get("http://localhost:5002/Product")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          const product=response.data.filter((value)=>value.category=='Toys')
          setProducts(product);
        } else if (response.data.Toys && Array.isArray(response.data.Toys)) {
          setProducts(response.data.Toys);
        } else {
          throw new Error("Invalid response format");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const formattedProduct = {
      ...product,
      price: parseFloat(product.price.replace("$", "")),
      quantity: 1,
    };

    cart.push(formattedProduct);
    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success(`${product.name} added to cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Slide,
      style: { backgroundColor: "#38BDF8", color: "#000000" },
    });
  };

  return (
    <div className="w-full text-gray-800">
      <Navbar className="w-full" />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Baby Toys Products</h1>

        {loading && <p className="text-center text-gray-500">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((item) => (
              <div key={item.id} className="border border-gray-300 p-4 rounded-lg shadow-lg bg-white">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-96 object-cover mb-4 rounded transition-transform transform hover:scale-105"
                />
                <h2 className="text-xl font-semibold text-center">{item.name}</h2>
                <p className="text-gray-600 text-sm mb-2 text-center">{item.description}</p>
                <p className="text-lg font-bold text-green-500 text-center">{item.price}</p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => addToCart(item)}
                    className="px-4 py-2 bg-blue-500 text-white rounded w-full hover:bg-blue-700 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => navigate(`/product/${item.id}`)} // Navigate to product details
                    className="px-4 py-2 bg-gray-500 text-white rounded w-full hover:bg-gray-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            !loading && !error && <p className="text-center text-gray-500">No products available</p>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Toys;
