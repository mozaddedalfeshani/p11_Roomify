import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

const MyBooking = () => {
  const { user } = useContext(AuthContext);

  const [bookedRooms, setBookedRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roomToCancel, setRoomToCancel] = useState(null);

  useEffect(() => {
    const fetchBookedRooms = async () => {
      axios
        .get(`http://localhost:9000/bookedRooms/${user.email}`)
        .then((res) => {
          setBookedRooms(res.data);
          console.log("console data", res.data);
        });
    };
    fetchBookedRooms();
  }, [user.email]);

  const handleCancel = (room) => {
    setRoomToCancel(room);
    setShowModal(true);
  };

  const confirmCancel = () => {
    axios
      .delete(`http://localhost:9000/bookedRooms/${roomToCancel._id}`)
      .then(() => {
        setBookedRooms(
          bookedRooms.filter((room) => room._id !== roomToCancel._id)
        );
        setShowModal(false);
        setRoomToCancel(null);
      });
  };

  if (!bookedRooms.length) {
    return (
      <span className="min-h-screen flex items-center justify-center">
        No data found
      </span>
    );
  }

  return (
    <div>
      <h1>My Bookings</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Booking Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookedRooms.map((room) => (
            <tr key={room._id}>
              <td>
                <img
                  src={room.image}
                  alt={room.name}
                  className="h-16 w-16 object-cover"
                />
              </td>
              <td>{room.name}</td>
              <td>${room.price}</td>
              <td>{room.bookingDate}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleCancel(room)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <h3>Confirm Cancellation</h3>
            <p>
              Are you sure you want to cancel the booking for{" "}
              {roomToCancel.name}?
            </p>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={confirmCancel}>
                Yes
              </button>
              <button className="btn" onClick={() => setShowModal(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
