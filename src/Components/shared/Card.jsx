import React from "react";
import { Link } from "react-router-dom";

const Card = ({ roomCard }) => {
  return (
    <Link
      to={`/room-details/${roomCard._id}`}
      className="card bg-base-100 shadow-xl max-w-96">
      <figure className="h-48 w-full overflow-hidden">
        <img
          src={roomCard.image}
          alt={roomCard.name}
          className="object-cover h-full w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title flex items-center justify-between">
          {roomCard.name}
          <div
            className={`badge ${
              !roomCard.booked ? "badge-success" : "badge-error"
            } ml-2 p-1`}>
            {!roomCard.booked ? "Available" : "Booked"}
          </div>
        </h2>
        <p>Description: {roomCard.description}</p>
        <p>Price: ${roomCard.price}</p>
        <p>Rating: {roomCard.rating}</p>
        <div className="card-actions justify-end"></div>
      </div>
    </Link>
  );
};

export default Card;
