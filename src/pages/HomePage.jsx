import React from "react";

import "leaflet/dist/leaflet.css";
import CoverflowSlider from "../Components/Home/CoverflowSlider";
import Map from "../Components/Home/Map";
import FeaturedRoom from "../Components/Home/FeaturedRoom";
import WhyChooseUs from "../Components/Home/WhyChooseUs";
const HomePage = () => {
  return (
    <div>
      {/* Banner Slider */}
      <CoverflowSlider />
      {/* Map Section */}
      <div>
        <h1 className="text-3xl font-bold text-center my-6">Explore Nearby</h1>
        <div className="h-[500px] my-5 rounded-xl ">
          <Map />
        </div>
      </div>

      {/* Fetured Rooms */}
      <FeaturedRoom />
      {/* why choose us */}
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
