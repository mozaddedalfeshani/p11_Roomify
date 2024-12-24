import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [review, setReview] = useState({ rating: 0, comment: "" });

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`http://localhost:9000/roomEmail/${user.email}`).then((res) => {
        console.log("data", res.data);
        setData(res.data);
      });
    };
    fetchData();
  }, [user.email]);

  const handleCancel = (room) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to cancel the booking for ${room.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:9000/cancelBooking/${room._id}`);
        setData(data.filter((item) => item._id !== room._id));
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
      }
    });
  };

  const handleReview = (room) => {
    const modal = document.getElementById("review-modal");
    modal.showModal();
    document.getElementById("submit-review").onclick = async () => {
      const rating = document.getElementById("rating").value;
      const comment = document.getElementById("comment").value;
      const newReview = {
        username: user.email,
        rating,
        comment,
        timestamp: new Date().toISOString(),
      };
      await axios.post(`http://localhost:9000/addReview/${room._id}`, newReview);
      Swal.fire("Review Submitted!", "Your review has been submitted.", "success");
      modal.close();
    };
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
                    className="px-4 btn btn-outline  py-2 rounded">
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReview(item)}
                    className="px-4 btn btn-outline  py-2 rounded ml-2">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DaisyUI Modal for Review */}
      <dialog id="review-modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Review for Room</h3>
          <label>Username:</label>
          <input type="text" id="username" value={user.email} readOnly className="input input-bordered w-full mb-2" />
          <label>Rating:</label>
          <input type="number" id="rating" className="input input-bordered w-full mb-2" min="1" max="5" />
          <label>Comment:</label>
          <textarea id="comment" className="textarea textarea-bordered w-full mb-2"></textarea>
          <div className="modal-action">
            <button id="submit-review" className="btn">Submit</button>
            <button className="btn" onClick={() => document.getElementById("review-modal").close()}>Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default MyBooking;
