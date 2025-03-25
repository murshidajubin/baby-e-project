import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user"));
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const urls = [
          "http://localhost:5002/Boy",
          "http://localhost:5002/Girl",
          "http://localhost:5002/Skincare",
          "http://localhost:5002/Newarrival",
          "http://localhost:5002/Toys"
        ];
  
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(response => response.json()));
  
        const allProducts = data.flat(); 
        console.log("Fetched Products:", allProducts); 
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchAllProducts();
  }, []);
  

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };
    updateCartCount();

    const handleStorageChange = () => {
      updateCartCount();
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setIsAuthenticated(!!storedUser);
      setUser(storedUser);
    };

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts([]);
      return;
    }
    console.log("Products available for search:", products);

    const results = products.filter((product) =>
      product?.name?.toLowerCase().includes(query.toLowerCase())
    );
    console.log("Filtered Results:", results); 
    setFilteredProducts(results);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center bg-white p-4 text-black font-bold shadow-md">
      <div onClick={() => navigate("/home")} className="cursor-pointer">
        <img 
          src="https://mothersparsh.com/cdn/shop/files/new_logo_e3f4d18e-a9c0-43d9-b91a-5a1c154b1b93_1.png?v=1734756103&width=150" 
          alt="Logo" 
          className="h-16" 
        />
      </div>
      
   
<div className="relative w-64">
  <input
    type="text"
    placeholder="Search products..."
    value={searchQuery}
    onChange={(e) => handleSearch(e.target.value)}
    className="border px-4 py-2 rounded-lg w-full focus:outline-none"
  />
  <FaSearch className="absolute top-3 right-3 text-gray-500" />

 
  {searchQuery.trim() !== "" && filteredProducts.length > 0 && (
    <div className="absolute bg-white border rounded shadow-md w-full mt-1 max-h-60 overflow-y-auto z-50">
      {filteredProducts.map((product) => (
        <div 
          key={product.id} 
          className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
        >
          <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
          <span>{product.name}</span>
        </div>
      ))}
    </div>
  )}
</div>


      
      <div className="flex gap-6 text-lg">
        <button onClick={() => navigate("/home")} className="hover:text-gray-500">Home</button>
        <button onClick={() => navigate("/about")} className="hover:text-gray-500">About</button>
        <button onClick={() => navigate("/boy")} className="hover:text-gray-500">Boy</button>
        <button onClick={() => navigate("/girl")} className="hover:text-gray-500">Girl</button>
        <button onClick={() => navigate("/skincare")} className="hover:text-gray-500">Skincare</button>
        <button onClick={() => navigate("/newarrivals")} className="hover:text-gray-500">New Arrivals</button>
        <button onClick={() => navigate("/toys")} className="hover:text-gray-500">Toys</button>
        <button onClick={() => navigate("/orders")} className="hover:text-gray-500">Orders</button>
      </div>

      <div className="flex items-center gap-6 relative">
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
            <FaUser className="hover:text-gray-500" />
            {isAuthenticated && <span className="text-gray-700 font-semibold">{user?.name}</span>}
          </div>
          {isDropdownOpen && isAuthenticated && (
            <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg p-4">
              <p className="text-gray-500 text-sm">{user?.email}</p>
              <button 
                onClick={handleLogout} 
                className="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="relative cursor-pointer" onClick={() => navigate("/cart")}> 
          <FaShoppingCart className="hover:text-gray-500 text-xl" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-1 rounded-full">
              {cartCount}
            </span>
          )}
        </div>
        {!isAuthenticated && (
          <button onClick={() => navigate("/login")} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
