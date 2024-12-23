import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const RoomDetails = () => {
  const { id } = useParams();

  const [room, setRoom] = useState({});
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    const fetchRoom = async () => {
      axios.get(`http://localhost:9000/room/${id}`).then((res) => {
        setRoom(res.data);
        setReviews(res.data.reviews || []);
        console.log("Room data:", res.data);
      });
    };

    fetchRoom();
  }, [id]);

  const handleBookNow = () => {
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    // Logic to book the room
    const bookingData = {
      date: selected ? selected.toLocaleDateString() : "No date selected",
      email: user.email,
      room: room._id,
      name: room.name,
      price: room.price,
    };

    try {
      await axios.post(
        `http://localhost:9000/room/${room._id}/book`,
        bookingData
      );
      console.log("Room booked:", bookingData);
      Swal.fire("Success!", "Your room has been booked.", "success");
      // Fetch room data again after booking
      axios.get(`http://localhost:9000/room/${id}`).then((res) => {
        setRoom(res.data);
        setReviews(res.data.reviews || []);
        console.log("Updated room data:", res.data);
      });
    } catch (error) {
      console.error("Error booking room:", error);
      Swal.fire("Error!", "There was an issue booking your room.", "error");
    }

    setIsModalOpen(false);
  };

  const today = new Date();

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
            <button
              className="btn btn-primary"
              onClick={handleBookNow}
              disabled={room.booked}>
              {!room.booked ? "Book Now" : "Unavailable"}
            </button>
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
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                {review.username}
                {/* <time className="text-xs opacity-50">2 hours ago</time> */}
              </div>
              <div className="chat-bubble">{review.review}</div>
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
