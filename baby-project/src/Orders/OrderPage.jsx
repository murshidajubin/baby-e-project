import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleCancelOrder = (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?"))
      return;

    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    toast.success("Order canceled successfully!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Orders
      </h2>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No Orders Found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border p-6 rounded-lg shadow-lg bg-white"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Order ID: {order.id}</h3>
                <p
                  className={`font-bold ${
                    order.paymentMethod === "Cash on Delivery"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {order.paymentMethod}
                </p>
              </div>
              <p className="text-gray-600 font-medium">
                Total: ₹{(order.total || 0).toFixed(2)}
              </p>

              <p className="text-blue-800 font-bold text-lg mt-2 animate-pulse">
                Order Status: Updating Soon...
              </p>

              {order.shippingAddress && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-100">
                  <h4 className="text-lg font-semibold">📍 Shipping Address:</h4>
                  <p className="text-gray-700">
                    {order.shippingAddress.name}
                  </p>
                  <p className="text-gray-700">
                    {order.shippingAddress.street}
                  </p>
                  <p className="text-gray-700">
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    - {order.shippingAddress.zip}
                  </p>
                  <p className="text-gray-700">
                    Phone: {order.shippingAddress.phone}
                  </p>
                </div>
              )}

              <h4 className="text-lg font-semibold mt-4">
                🛍️ Items Ordered:
              </h4>
              <ul className="mt-2 space-y-2">
                {(order.items || []).map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-lg">{item.name}</p>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-green-600">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCancelOrder(order.id)}
                className="mt-4 px-4 py-2 text-sm font-bold rounded bg-red-600 text-white hover:bg-red-700"
              >
                Cancel Order
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default OrderPage;
