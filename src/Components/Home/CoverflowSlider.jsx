import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import { HOST } from "../../host";
function CoverflowSlider() {
  const [roomInfo, setRoomInfo] = useState([]);

  useEffect(() => {
    fetch(`${HOST}/rooms`)
      .then((response) => response.json())
      .then((data) => setRoomInfo(data))
      .catch((error) => console.error("Error fetching room data:", error));
  }, []);

  return (
    <div className="my-5">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="w-full rounded-lg shadow-lg">
        {roomInfo.map((room, index) => (
          <SwiperSlide key={index} className="w-full">
            <motion.div
              className="hero min-h-[60vh] w-full"
              style={{
                backgroundImage: `url(${room.image})`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}>
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-neutral-content text-center">
                <motion.div
                  className="max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, delay: 0.3 }}>
                  <h1 className="mb-5 text-5xl font-bold">{room.name}</h1>
                  <p className="mb-5">{room.description} </p>
                  <Link
                    to={`/room-details/${room._id}`}
                    className="btn btn-primary">
                    learn more
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CoverflowSlider;
