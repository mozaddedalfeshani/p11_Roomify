import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import CoverflowSlider from "../Components/Home/CoverflowSlider";
import Map from "../Components/Home/Map";
import FeaturedRoom from "../Components/Home/FeaturedRoom";
import WhyChooseUs from "../Components/Home/WhyChooseUs";
import AboutUs from "../Components/Home/AboutUs";
import Footer from "../Components/shared/Footer";

const imageUrls = [
  "https://image-tc.galaxy.tf/wijpeg-k4h6gvovqe0bbfizq35w2w5s/deluxe-king-1920-x-1080.jpg",
  "https://www.grandhotelgardone.it/images/gallery/rooms/superior-double-room/double-room-superior-3.jpg",
];

const HomePage = () => {
  useEffect(() => {
    const isFirstVisit = localStorage.getItem("isFirstVisit");
    if (!isFirstVisit) {
      const randomImageUrl =
        imageUrls[Math.floor(Math.random() * imageUrls.length)];
      Swal.fire({
        title: "Special Offers and Promotions",
        text: "Check out our latest discounts and promotions! Don't forget our collection of rooms.",
        imageUrl: randomImageUrl,
        imageWidth: 600,
        imageHeight: 300,
        imageAlt: "Special Offers",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        showCancelButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("isFirstVisit", "true");
        }
      });
    }
  }, []);

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

      <AboutUs />
      <Footer />
    </div>
  );
};

export default HomePage;
