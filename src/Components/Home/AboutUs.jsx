import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="py-12 card shadow-sm">
      <div className="container mx-auto px-6">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12">
          <h2 className="text-4xl font-bold">About Us</h2>
          <p className="mt-4">
            Discover who we are and what makes us the best choice for your next
            stay.
          </p>
        </motion.div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center">
            <img
              src="https://www.impactbnd.com/hubfs/blog-image-uploads/best-about-us-pages.jpg"
              alt="About Us"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="mb-4">
              At our hotel, we strive to provide exceptional experiences for our
              guests. From luxurious rooms to outstanding customer service, we
              ensure your stay is unforgettable.
            </p>
            <p>
              Whether you're traveling for business or leisure, our
              accommodations cater to all your needs. Experience comfort,
              convenience, and elegance with us.
            </p>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6  shadow-lg rounded-lg">
            <div className="mb-4">
              <i className="fas fa-star text-4xl"></i>
            </div>
            <h4 className="text-xl font-semibold">Excellence</h4>
            <p className="mt-2">
              We are committed to delivering excellence in everything we do.
            </p>
          </div>

          <div className="text-center p-6  shadow-lg rounded-lg">
            <div className="mb-4">
              <i className="fas fa-leaf text-4xl"></i>
            </div>
            <h4 className="text-xl font-semibold">Sustainability</h4>
            <p className="mt-2">
              Our practices are designed to support a sustainable future.
            </p>
          </div>

          <div className="text-center p-6  shadow-lg rounded-lg">
            <div className="mb-4">
              <i className="fas fa-heart text-4xl"></i>
            </div>
            <h4 className="text-xl font-semibold">Customer Focus</h4>
            <p className="mt-2">
              Our guests are at the heart of everything we do.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
