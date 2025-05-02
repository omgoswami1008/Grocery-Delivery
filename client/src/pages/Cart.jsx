import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyAddress, assets } from "../assets/assets";

const Cart = () => {
  const {
    products,
    currency,
    getCartCount,
    updateCartItem,
    removeFromCart,
    cartItems,
    navigate,
    getCartAmount,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState(dummyAddress);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [PaymentOption, setPaymentOption] = useState("COD");
  const [showAddress, setShowAddress] = useState(false);

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        product.quantity = cartItems[key];
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  const placeOrder = async () => {
    // Add your order logic here
  };

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col lg:flex-row gap-10 mt-16 px-4">
      {/* Cart Section */}
      <div className="flex-1 w-full">
        <h1 className="text-3xl font-semibold mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">{getCartCount()} items</span>
        </h1>

        {/* Cart Header */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-gray-500 font-medium pb-3 border-b border-gray-200">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {/* Cart Items */}
        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 items-center text-sm md:text-base font-medium py-4 border-b border-gray-200"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4">
              <div
                onClick={() => {
                  navigate(
                    `/product/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-gray-500 text-sm">
                  Weight: {product.weight || "N/A"}
                </p>
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                  <span>Qty:</span>
                  <select
                    className="outline-none border border-gray-300 rounded px-1"
                    value={cartItems[product._id]}
                    onChange={(e) =>
                      updateCartItem(product._id, Number(e.target.value))
                    }
                  >
                    {Array(
                      cartItems[product._id] > 9 ? cartItems[product._id] : 9
                    )
                      .fill("")
                      .map((_, idx) => (
                        <option key={idx} value={idx + 1}>
                          {idx + 1}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Subtotal */}
            <div className="cursor-pointer mx-auto">
              <p className="text-center md:text-left text-gray-700">
                {currency}
                {product.offerPrice * product.quantity}
              </p>
            </div>

            {/* Action (Remove Button) */}
            <div className="cursor-pointer mx-auto">
              <button
                onClick={() => removeFromCart(product._id)}
                className="cursor-pointer"
              >
                <img
                  src={assets.remove_icon}
                  alt="remove"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>
        ))}

        {/* Continue Shopping */}
        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="flex items-center gap-2 mt-6 text- font-medium hover:underline"
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt="arrow"
            className="transition-transform group-hover:translate-x-1"
          />
          Continue Shopping
        </button>
      </div>

      {/* Summary Section */}
      <div className="lg:w-[360px] bg-gray-100/40 p-5 border border-gray-300/70 rounded-md">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <hr className="border-gray-300 my-4" />

        {/* Delivery Address */}
        <div className="mb-4">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative mt-2 text-sm text-gray-600">
            <p>
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline mt-2"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-full mt-2 bg-white border border-gray-300 w-full z-10 shadow">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-center p-2 text-primary0 hover:bg-primary-dull cursor-pointer"
                >
                  Add address
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <p className="text-sm font-medium uppercase">Payment Method</p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 rounded outline-none"
            value={PaymentOption}
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        {/* Summary Pricing */}
        <hr className="border-gray-300 my-4" />
        <div className="text-gray-600 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </div>
          <div className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>
              {currency}
              {(getCartAmount() * 102) / 100}
            </span>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 bg-primary text-white font-medium rounded hover:bg-primary-dull transition"
        >
          {PaymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
