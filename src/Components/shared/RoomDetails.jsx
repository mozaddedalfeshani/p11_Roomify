import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { AuthContext } from "../../provider/AuthProvider";

const RoomDetails = () => {
  const { id } = useParams();

  const [room, setRoom] = useState({});
  const [reviews, setReviews] = useState([]);
  const [bookingDate, setBookingDate] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRoom = async () => {
      axios.get(`http://localhost:9000/room/${id}`).then((res) => {
        setRoom(res.data);
        setReviews(res.data.reviews || []);
      });
    };

    fetchRoom();
  }, [id]);

  const handleBookNow = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Booking Confirmation",
        html: `
        <div>
          <h2>${room.name}</h2>
          <p>${room.description}</p>
          <p>Price: $${room.price}</p>
          <p>Rating: ${room.rating}</p>
          <div>
            <label for="bookingDate">Select Booking Date:</label>
            <div id="bookingDate"></div>
          </div>
        </div>
      `,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Confirm Booking",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        didOpen: () => {
          const container = document.getElementById("bookingDate");
          const datepicker = (
            <DayPicker
              selected={bookingDate}
              onSelect={(date) => setBookingDate(date)}
            />
          );
          ReactDOM.render(datepicker, container);
        },
      })
      .then((result) => {
        if (result.isConfirmed && bookingDate) {
          axios
            .post(`http://localhost:9000/room/${id}/book`, {
              date: bookingDate,
              email: user.email, // Include user's email
            })
            .then(() => {
              swalWithBootstrapButtons.fire({
                title: "Booked!",
                text: "Your room has been booked.",
                icon: "success",
              });
              setRoom((prevRoom) => ({ ...prevRoom, availability: false }));
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your booking has been cancelled.",
            icon: "error",
          });
        }
      });
  };

  const handlePostReview = () => {
    if (!user) {
      Swal.fire({
        title: "Not Logged In",
        text: "You need to be logged in to post a review.",
        icon: "warning",
      });
      return;
    }

    Swal.fire({
      title: "Post a Review",
      html: `
        <input type="text" id="reviewText" class="swal2-input" placeholder="Your review">
        <input type="number" id="reviewRating" class="swal2-input" placeholder="Rating (1-5)" min="1" max="5">
      `,
      showCancelButton: true,
      confirmButtonText: "Post",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const reviewText = Swal.getPopup().querySelector("#reviewText").value;
        const reviewRating =
          Swal.getPopup().querySelector("#reviewRating").value;
        if (!reviewText || !reviewRating) {
          Swal.showValidationMessage(
            `Please enter both review text and rating`
          );
        }
        return { reviewText, reviewRating };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { reviewText, reviewRating } = result.value;
        axios
          .post(`http://localhost:9000/room/${id}/review`, {
            review: reviewText,
            rating: reviewRating,
            username: user.name,
          })
          .then((res) => {
            setReviews((prevReviews) => [...prevReviews, res.data]);
            setRoom((prevRoom) => ({
              ...prevRoom,
              reviews: [...prevRoom.reviews, res.data],
            }));
            Swal.fire({
              title: "Review Posted!",
              text: "Your review has been posted.",
              icon: "success",
            });
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl flex flex-col md:flex-row">
        <figure className="md:w-1/2">
          <img
            src={room.image}
            alt={room.name}
            className="w-full object-cover"
          />
        </figure>
        <div className="card-body md:w-1/2 p-10 flex flex-col justify-start flex-1 text-start">
          <h2 className="card-title">{room.name}</h2>
          <p className="text-start m-0">{room.description}</p>
          <div className="card-actions mt-4">
            <p className="text-start m-0">{`Price: $${room.price}`}</p>
            <button
              className="btn btn-primary"
              onClick={handleBookNow}
              disabled={!room.availability}>
              {room.availability ? "Book Now" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
      <div className="reviews mt-8">
        <h3 className="text-xl font-bold">Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review p-4 border-b">
              <p>
                <strong>{review.username}</strong>: {review.review}
              </p>
              <p>{`Rating: ${review.rating}`}</p>
            </div>
          ))
        ) : (
          <p>No reviews available for this room.</p>
        )}
        {user && (
          <div className="post-review mt-4">
            <button className="btn btn-primary" onClick={handlePostReview}>
              Post a Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;
