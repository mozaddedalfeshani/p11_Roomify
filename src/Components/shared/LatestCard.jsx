import React from "react";
import { Link } from "react-router-dom";

const LatestCard = ({ visaCard }) => {
  return (
    <div className="card bg-base-100 max-w-96  shadow-xl">
      <figure>
        <img src={visaCard.image} alt={visaCard.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {visaCard.name}
          {!visaCard.booked ? (
            <div className="badge badge-primary">Available</div>
          ) : (
            <div className="badge badge-secondary">Unavailable</div>
          )}
        </h2>
        <p>Description: {visaCard.description}</p>
        <p>Price: ${visaCard.price}</p>
        <p>Rating: {visaCard.rating} stars</p>

        <div className="card-actions justify-end">
          <Link
            to={`/room-details/${visaCard._id}`}
            className="btn btn-secondary">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestCard;
