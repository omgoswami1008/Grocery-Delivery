import React, { useState } from "react";
import { assets } from "../assets/assets";

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const InputField = ({ type = "text", placeholder, name, handleChange }) => (
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none text-gray-600 placeholder-gray-400 bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
    />
  );

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Address Submitted:", address);
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-700 font-semibold">
        Add Shipping <span className="text-primary">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md bg-white p-8 rounded-xl shadow-lg">
          <form className="space-y-4 text-sm" onSubmit={onsubmitHandler}>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <InputField
              handleChange={handleChange}
              name="email"
              type="email"
              placeholder="Email Address"
            />
            <InputField
              handleChange={handleChange}
              name="street"
              type="text"
              placeholder="Street Address"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                name="city"
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                name="zipCode"
                type="number"
                placeholder="Zip Code"
              />
              <InputField
                handleChange={handleChange}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>
            <InputField
              handleChange={handleChange}
              name="phone"
              type="tel"
              placeholder="Phone Number"
            />
            <button
              type="submit"
              className="w-full mt-6 bg-primary hover:bg-primary/80 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wide"
            >
              Save Address
            </button>
          </form>
        </div>

        <img
          className="md:mr-16 mb-16 md:mt-0 w-full max-w-md "
          src={assets.add_address_iamge}
          alt="Add Address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
