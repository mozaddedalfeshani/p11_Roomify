import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert
import { HOST } from "../host";
import Rate from "rc-rate"; // Import rc-rate
import "rc-rate/assets/index.css"; // Import rc-rate styles
import { DayPicker } from "react-day-picker"; // Import DayPicker
import "react-day-picker/dist/style.css"; // Import DayPicker styles

const MyBooking = () => {
  const [selected, setSelected] = useState();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [temp, setTemp] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchData = async () => {
    axios.get(`${HOST}/roomEmail/${user.email}`).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [user.email]); // Removed 'data' from dependency array

  const handleCancel = async (item) => {

    const data = {
      booked: false,
      bookedBy: "",
      image: item.image,
      name: item.name,
      price: item.price,
      rating: item.rating,
      reviews: item.reviews,
      _id: item._id,
    };

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to cancel the booking for ${item.name} at $${item.price}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Perform cancellation logic here

        try {
          await axios.post(`${HOST}/room/${item._id}/cancel`, data);
          Swal.fire(
            "Cancelled!",
            "Your booking has been cancelled.",
            "success"
          );
          // Update the UI instantly by removing the canceled room from the state
          setData((prevData) =>
            prevData.filter((room) => room._id !== item._id)
          );
          // Fetch the updated data after cancellation
          fetchData();
        } catch (error) {
          console.error("Error cancelling booking:", error);
          Swal.fire(
            "Error!",
            "There was an error cancelling your booking.",
            "error"
          );
        }
      }
    });
  };

  const handleAddReview = (item) => {
    setSelectedRoom(item);
    document.getElementById("review_modal").showModal();
  };

  const submitReview = () => {
    const reviewData = {
      username: user.displayName,
      rating,
      comment,
      timestamp: new Date().toISOString(),
      roomId: selectedRoom._id,
    };
    try {


      axios
        .post(`${HOST}/rooms/${selectedRoom._id}/review`, reviewData);
      Swal.fire(
        "Success!",
        "Your review has been submitted successfully.",
        "success"
      );
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire(
        "Error!",
        "There was an error submitting your review.",
        "error"
      );
    }
    // Optionally, send reviewData to the server
    document.getElementById("review_modal").close();
  };

  const getBorderColor = (status) => {
    switch (status) {
      case "confirmed":
        return "border-green-500";
      case "pending":
        return "border-yellow-500";
      case "cancelled":
        return "border-red-500";
      default:
        return "border-gray-300";
    }
  };

  const handleUpdateDate = (item) => {
    setSelectedBooking(item);
    document.getElementById("my_modal_5").showModal();
  };

  const submitDateUpdate = async (item) => {
    const data = {
      booked: true,
      bookedBy: user.displayName,
      image: item.image,
      name: item.name,
      price: item.price,
      rating: item.rating,
      reviews: item.reviews,
      _id: item._id,
      bookingDate: selected.toLocaleDateString(),
    };

    document.getElementById("my_modal_5").close();
  };
  const today = new Date();
  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold my-2 text-center">My Bookings</h1>
      <div className="card shadow-md">
        {data.length === 0 ? (
          <p className="text-center py-4">You haven't booked any rooms yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {data.map((item) => (
              <div
                key={item._id}
                className={`card border-l-4 ${getBorderColor(
                  item.status
                )} shadow-md`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleCancel(item)}
                      className="btn btn-outline">
                      Cancel
                    </button>
                    <button
                      onClick={() => handleAddReview(item)}
                      className="btn btn-outline ml-2">
                      Add Review
                    </button>
                    <button
                      onClick={() => handleUpdateDate(setTemp(item))}
                      className="btn btn-outline ml-2">
                      Update Date
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <dialog id="review_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Review</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={user.displayName}
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <Rate value={rating} onChange={setRating} count={5} allowHalf />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Comment</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              value={comment}
              onChange={(e) => setComment(e.target.value)}></textarea>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={submitReview}>
              Submit
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("review_modal").close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Booking Date</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select New Date</span>
            </label>
            <div className="flex justify-center flex-1">
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
            </div>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={() => submitDateUpdate(temp)}>
              Submit
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_5").close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyBooking;
