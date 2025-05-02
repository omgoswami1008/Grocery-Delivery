import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      {/* Banner Image */}
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      {/* Feature Section */}
      <div className="absolute inset-0 flex justify-center md:justify-end items-center">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 md:p-10 m-4 md:m-0 md:mr-24 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
            Why We are the Best
          </h1>
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 mt-3">
              <img
                src={feature.icon}
                alt={feature.title}
                className="md:w-11 w-9"
              />
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
