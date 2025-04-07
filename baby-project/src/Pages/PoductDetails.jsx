import { useParams, useNavigate, data } from "react-router-dom"; 
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../NavbarContext/Navbar";
import Footer from "../Footer/Footer";

const ProductDetails = () => {
 
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    axios.get(`http://localhost:5002/Product/${id}`)
      .then((response) => {
      
        
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Product not found.");
        } else {
          setError("Failed to load product details.");
        }
        setLoading(false);
      });
  }, [id]);
  
  
  const handleAddToCart = async() => {
    if (!product) 
      return;
    
  
     
   
    alert('add cart')
    const userid=localStorage.getItem('id')

    
   var res =await axios.get(`http://localhost:5002/users/${userid}`)
   const cart=res.data.cart
   const newCart=[...cart,product]
   const response=await axios.patch(`http://localhost:5002/users/${userid}`,{cart:newCart})
    console.log(response.data);
    
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    // Wait for the toast to show, then navigate to cart page
    setTimeout(() => {
      // navigate("/cart"); // Redirect to cart page
    }, 2000); // Delay to allow toast to be visible
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full text-gray-800">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        {product && (
          <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white flex flex-col md:flex-row">
           
            <div className="w-full md:w-1/3 mb-6 md:mb-0 md:mr-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 object-contain rounded-lg shadow-lg"
              />
            </div>

           
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-semibold text-center md:text-left mb-4">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <p className="text-lg font-bold text-green-500 text-center md:text-left mb-4">
                {product.price}
              </p>
              <p className="text-sm text-gray-500 text-center md:text-left mb-4">
                {product.material}
              </p>
              <p className="text-sm text-gray-500 text-center md:text-left mb-4">
                {product.discount}
              </p>

              <button
                onClick={handleAddToCart}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full md:w-auto hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
