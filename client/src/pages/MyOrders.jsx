import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency } = useAppContext();

  const fetchMyOrders = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="mt-16 pb-16 px-4">
      <div className="text-center mb-12">
        <p className="text-3xl font-bold uppercase">My Orders</p>
        <div className="w-24 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
      </div>

      {myOrders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="flex flex-col items-center gap-8">
          {myOrders.map((order, index) => (
            <div
              key={index}
              className="w-full max-w-4xl border border-gray-300 rounded-lg p-6 shadow-md"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold">{order._id}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Payment Type</p>
                  <p className="font-semibold">{order.paymentType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-lg font-bold text-primary">
                    {currency}
                    {order.amount}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="flex flex-col gap-6">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row gap-6 border-t pt-6"
                  >
                    {/* Product Image and Name */}
                    <div className="flex items-center gap-4 w-full md:w-1/2">
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <img
                          src={item.product.image[0]}
                          alt=""
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {item.product.name}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Category: {item.product.category}
                        </p>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col md:flex-row w-full md:w-1/2 justify-between text-gray-700 text-sm">
                      {/* Left Column */}
                      <div className="flex flex-col gap-2">
                        <p className=" font-medium">
                          Quantity:{" "}
                          <span className="font-normal">
                            {item.quantity || "1"}
                          </span>
                        </p>
                        <p className=" font-medium">
                          Status:{" "}
                          <span className="font-normal">{item.status}</span>
                        </p>
                        <p className=" font-medium">
                          Date:{" "}
                          <span className="font-normal">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </p>
                      </div>

                      {/* Right Column */}
                      <div className="flex items-start md:items-center justify-end mt-2 md:mt-0">
                        <p className="text-primary text-lg font-bold">
                          Amount:{" "}
                          <span className="font-normal">
                            {currency}
                            {item.product.offerPrice * item.quantity}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
