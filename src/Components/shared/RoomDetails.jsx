import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { HOST } from "../../host";
import { Link } from "react-router-dom";
const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Ensure location is imported and used

  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    const fetchRoom = async () => {
      axios.get(`${HOST}/room/${id}`).then((res) => {
        setRoom(res.data);
        setReviews(res.data.reviews || []);
      });
    };

    fetchRoom();
  }, [id]);

  const handleBookNow = () => {
    setIsModalOpen(true);
  };
  const handleConfirmBooking = async () => {
    const bookingData = {
      bookingDate: selected
        ? selected.toLocaleDateString()
        : "No date selected",
      bookedBy: user.email,
      booked: true,
    };
    if (!user) {
      Swal.fire("Error!", "You need to login to book a room.", "error");
      return;
    }
    try {
      await axios
        .post(`${HOST}/room/${room._id}/book`, bookingData)
        .then((res) => {});

      Swal.fire("Success!", "Your room has been booked.", "success");

      // Fetch room data again after booking
      setTimeout(() => {
        axios.get(`${HOST}/room/${id}`).then((res) => {
          setRoom(res.data);
          setReviews(res.data.reviews || []);
        });
      }, 500); // Small delay to ensure consistency
    } catch (error) {
      console.error(
        "Error booking room:",
        error.response?.data || error.message
      );
      Swal.fire(
        "Error!",
        error.response?.data || "There was an issue booking your room.",
        "error"
      );
    }

    setIsModalOpen(false);
  };

  const today = new Date();

  if (!room) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring loading-2xl"></span>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <motion.div
        className="card bg-base-100 shadow-xl flex flex-col md:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <figure className="md:w-1/2">
          <img
            src={room.image}
            alt={room.name}
            className="w-full object-cover"
          />
        </figure>
        <motion.div
          className="card-body md:w-1/2 p-10 flex flex-col justify-start flex-1 text-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <h2 className="card-title">{room.name}</h2>
          <p className="text-start m-0">{room.description}</p>
          <div className="card-actions mt-4">
            <p className="text-start m-0">{`Price: $${room.price}`}</p>
            {!user && !room.booked ? (
              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate("/login", { state: { from: location } })
                }>
                Book
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleBookNow}
                disabled={room.booked}>
                {!room.booked ? "Book Now" : "Unavailable"}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="reviews mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <h3 className="text-xl font-bold">Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <motion.div
              key={index}
              className="chat chat-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={
                      review.imageLink ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <div className="chat-header">
                {review.username}
                {/* <time className="text-xs opacity-50">2 hours ago</time> */}
              </div>
              <div className="chat-bubble">{review.comment}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </motion.div>
          ))
        ) : (
          <p>No reviews available for this room.</p>
        )}
      </motion.div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box  shadow-2xl bg-base-100">
            <h3 className="font-bold text-lg">Room Summary</h3>
            <p className="py-4">
              Name: {room.name}
              <br />
              Description: {room.description}
              <br />
              Price: ${room.price}
              <br />
              Availability: {room.availability ? "Available" : "Unavailable"}
            </p>
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              fromDate={today}
              footer={
                selected
                  ? `Selected: ${selected.toLocaleDateString()}`
                  : "Pick a day."
              }
            />
            <motion.div
              className="modal-action"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <button
                className="btn btn-primary"
                onClick={handleConfirmBooking}
                disabled={!selected}>
                Confirm
              </button>
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
