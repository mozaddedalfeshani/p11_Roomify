import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert
import { HOST } from "../host";
import Rate from "rc-rate"; // Import rc-rate
import "rc-rate/assets/index.css"; // Import rc-rate styles

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`${HOST}/roomEmail/${user.email}`).then((res) => {
        setData(res.data);
      });
    };
    fetchData();
  }, [user.email]);

  const handleCancel = async (item) => {
    console.log(item);
    const data = {
      booked: false,
      bookedBy: "",
      image: item.image,
      name: item.name,
      price: item.price,
      rating: item.rating,
      reviews: item.reviews,
      _id: item._id,
      availability: item.availability,
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
        console.log("Cancel booking", data);
        try {
          await axios.post(`${HOST}/room/${item._id}/cancel`, data);
          Swal.fire(
            "Cancelled!",
            "Your booking has been cancelled.",
            "success"
          );
          // Optionally, refresh the data to reflect the cancellation
          setData((prevData) =>
            prevData.filter((room) => room._id !== item._id)
          );
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
      console.log("Review submitted:", reviewData);
      console.log("Name:", user.displayName);
      console.log("Rating:", rating);
      console.log("Review Text:", comment);
      console.log("Time Stamp:", new Date().toISOString());

      axios
        .post(`${HOST}/rooms/${selectedRoom._id}/review`, reviewData)
        .then((res) => console.log(res.data));
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

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold my-2 text-center">My Bookings</h1>
      <div className="card shadow-md">
        {data.length === 0 ? (
          <p className="text-center py-4">You haven't booked any rooms yet.</p>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 text-center">Image</th>
                <th className="py-2 text-center">Name</th>
                <th className="py-2 text-center">Price</th>
                <th className="py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className={`border-l-4 ${getBorderColor(item.status)}`}>
                  <td className="py-2 text-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover mx-auto"
                    />
                  </td>
                  <td className="py-2 text-center">{item.name}</td>
                  <td className="py-2 text-center">${item.price}</td>
                  <td className="py-2 text-center">
                    <button
                      onClick={() => handleCancel(item)}
                      className="px-4 btn btn-outline py-2 rounded">
                      Cancel
                    </button>
                    <button
                      onClick={() => handleAddReview(item)}
                      className="px-4 btn btn-outline py-2 rounded ml-2">
                      Add Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            <Rate
              value={rating}
              onChange={setRating}
              count={5}
              allowHalf
            />
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
    </div>
  );
};

export default MyBooking;
