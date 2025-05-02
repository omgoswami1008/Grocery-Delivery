import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { dummyOrders, assets } from "../../assets/assets";

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setOrders(dummyOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []); // added [] to avoid infinite fetching

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center gap-5 justify-between p-5 max-w-6xl rounded-md border border-gray-300"
          >
            {/* Image + Items */}
            <div className="flex gap-4 min-w-[200px]">
              <img
                className="w-12 h-12 object-cover opacity-60"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div className="flex flex-col">
                {order.items.map((item, idx) => (
                  <p key={idx} className="font-medium text-sm">
                    {item.product.name}{" "}
                    <span className="text-primary">x {item.quantity}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="text-sm text-black/60 flex flex-col min-w-[180px]">
              <p className="font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city}
              </p>
              <p>
                {order.address.state}, {order.address.zipcode}
              </p>
              <p>{order.address.country}</p>
              <p>{order.address.phone}</p>
            </div>

            {/* Amount */}
            <div className="text-lg font-semibold text-primary min-w-[100px]">
              {currency}
              {order.amount}
            </div>

            {/* Payment Info */}
            <div className="text-sm text-black/60 flex flex-col min-w-[160px]">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
