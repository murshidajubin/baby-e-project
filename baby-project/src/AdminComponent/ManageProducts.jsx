import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Toys"); 
  const [editingProduct, setEditingProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "Toys",
  });

  useEffect(() => {
    fetchProducts();
    resetForm();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5002/Product`);
      const filtered = response.data.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setProducts(filtered);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductData(product);
    setErrorMessage("");
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5002/Product/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, price, description, image } = productData;

    if (!name || !price || !image) {
      setErrorMessage("⚠️ Please fill in all required fields!");
      return;
    }

    try {
      const newData = {
        ...productData,
        category: selectedCategory,
      };

      if (editingProduct) {
        await axios.put(
          `http://localhost:5002/Product/${editingProduct.id}`,
          newData
        );
        setEditingProduct(null);
      } else {
        await axios.post(`http://localhost:5002/Product`, newData);
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const resetForm = () => {
    setProductData({
      name: "",
      price: "",
      description: "",
      image: "",
      category: selectedCategory,
    });
    setEditingProduct(null);
    setErrorMessage("");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Products</h2>

      <div className="mb-6">
        <label className="mr-2 font-semibold">Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="Toys">Toys</option>
          <option value="girl">Girl</option>
          <option value="Boy">Boy</option>
          <option value="skincare">Skincare</option>
          <option value="newarrival">Newarriaval</option>

        </select>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="image"
            value={productData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="border p-2 rounded"
          />
        </div>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>

          {editingProduct && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-px">

  {products.map((product) => (
    <div
      key={product.id}
      className="border p-3 rounded-lg shadow bg-white hover:shadow-md transition-shadow duration-300 w-60 mx-auto"
    >
     <div className="w-full h-32 overflow-hidden rounded mb-0.5">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-700 text-sm font-medium">₹ {product.price}</p>
      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{product.description}</p>

      <div className="mt-3 flex justify-between">
        <button
          onClick={() => handleEdit(product)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-xs"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(product.id)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>


    </div>
  );
};

export default ManageProducts;
