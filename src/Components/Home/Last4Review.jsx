import axios from "axios";
import React from "react";
import user from "../../user.png"; // Adjusted import statement
import { HOST } from "../../host";

const Last4Review = () => {
  const [review, setReview] = React.useState([]);
  React.useEffect(() => {
    const fetchdata = axios.get(`${HOST}/last-4-reviews`).then((res) => {
      setReview(res.data);
    });
  }, []);

  return (
    <>
      <h2 className="text-center font-medium my-10 text-[30px]">
        Latest Reviews from Customars
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {review.map((item, index) => {
          return <ReviewCard key={index} item={item} />;
        })}
      </div>
    </>
  );
};

const ReviewCard = ({ item }) => {
  return (
    <div className="card shadow-lg p-6 rounded-lg">
      <div className="card-body items-center text-center">
        <img
          src={item.reviews.imageLink || user}
          alt={item.reviews.username}
          className="w-16 h-16 mx-auto mb-4 rounded-xl"
        />
        <h3 className="text-xl font-semibold">{item.name}</h3>
        <h1>Rating : {item.reviews.rating}</h1>
        <h1>{item.reviews.username}</h1>
        <p className="mt-2">{item.reviews.comment}</p>
      </div>
    </div>
  );
};

export default Last4Review;
