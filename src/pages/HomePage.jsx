import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import CoverflowSlider from "../Components/Home/CoverflowSlider";
import Map from "../Components/Home/Map";
import FeaturedRoom from "../Components/Home/FeaturedRoom";
import WhyChooseUs from "../Components/Home/WhyChooseUs";
import AboutUs from "../Components/Home/AboutUs";
import Footer from "../Components/shared/Footer";
import Last4Review from "../Components/Home/Last4Review";
import Faq from "../Components/Home/Faq";

const imageUrls = [
  "https://image-tc.galaxy.tf/wijpeg-k4h6gvovqe0bbfizq35w2w5s/deluxe-king-1920-x-1080.jpg",
  "https://www.grandhotelgardone.it/images/gallery/rooms/superior-double-room/double-room-superior-3.jpg",
];

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [randomImageUrl, setRandomImageUrl] = useState("");

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("isFirstVisit");
    if (!isFirstVisit) {
      const randomImageUrl =
        imageUrls[Math.floor(Math.random() * imageUrls.length)];
      setRandomImageUrl(randomImageUrl);
      setShowModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    localStorage.setItem("isFirstVisit", "false");
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <div
              className="hero min-h-[80vh] flex items-center justify-center"
              style={{
                backgroundImage: `url(${randomImageUrl})`,
              }}>
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">
                    Special Offers and Promotions
                  </h1>
                  <p className="mb-5">
                    Check out our latest discounts and promotions! Don't forget
                    our collection of rooms.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={handleCloseModal}>
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Banner Slider */}
      <CoverflowSlider />
      {/* Map Section */}
      <div>
        <h1 className="text-3xl font-bold text-center my-6">Explore Nearby</h1>
        <div className="h-[500px] my-5 rounded-xl   z-0">
          <Map />
        </div>
      </div>

      {/* Fetured Rooms */}
      <FeaturedRoom />
      {/* The latest 4 view  */}
      <Last4Review />
      {/* why choose us */}
      <WhyChooseUs />
      {/* Responsive and 2 will side by side on large screen */}
      <h1 className="text-3xl font-bold text-center my-6">
        Frequently Asked Questions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        <div className="flex items-center justify-center">
          <img
            src="https://i.ibb.co.com/rbdWpmY/faq.png"
            alt="faq"
            className="w-[300px] h-[300px] object-cover"
          />
        </div>
        <div className="flex items-center justify-center">
          <Faq />
        </div>
      </div>

      <AboutUs />
      <Footer />
    </div>
  );
};

export default HomePage;
