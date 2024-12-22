import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
const images = [
  "https://edulaunchers.com/wp-content/uploads/2023/08/Visa-Processing-scaled.webp",
  "https://careerpaths.com.bd/wp-content/uploads/2022/04/UK-Student-Visa-Process-for-bangladeshi-student.png",
  "https://assets.studies-overseas.com/Germany_Student_Visa_Process_New_Banner_Size_1190_400_bac6de4cdf.png",
  "https://globaltree.in/uploadsweb/blog/ireland-visa-process-application-process-requirements-and-tips-L-1726665164.webp",
];
const RoomInfo = [
  {
    id: 3,
    "Heading Title": "Family Room",
    price: 400 + "€",
    des: "This is a family room with a double bed and a single bed. It is perfect for a family.",
    img: "https://st.hzcdn.com/simgs/pictures/family-rooms/new-home-wayzata-mn-14-lecy-bros-homes-and-remodeling-img~d411bd4206e86ee4_14-6092-1-66fd2b1.jpg",
  },
  {
    id: 1,
    "Heading Title": "Single Room",
    price: 200 + "€",
    des: "This is a single room with a single bed and a small table. It is perfect for a single person.",
    img: "https://webbox.imgix.net/images/owvecfmxulwbfvxm/c56a0c0d-8454-431a-9b3e-f420c72e82e3.jpg?auto=format,compress&fit=crop&crop=entropy",
  },
  {
    id: 2,
    "Heading Title": "Double Room",
    price: 300 + "€",
    des: "This is a double room with a double bed and a small table. It is perfect for two people.",
    img: "https://roomraccoon.com/wp-content/uploads/2024/06/DOUBLE-ROOM-FEATURED-BLOG-IMAGES-3.png",
  },
];

function CoverflowSlider() {
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
        {RoomInfo.map((src, index) => (
          <SwiperSlide key={index} className="w-full">
            <div
              className="hero min-h-[60vh] w-full"
              style={{
                backgroundImage: `url(${src.img})`,
              }}>
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">
                    {src["Heading Title"]}
                  </h1>
                  <p className="mb-5">{src.des} </p>
                  <Link to="rooms" className="btn btn-primary">
                    learn more
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CoverflowSlider;
