import React from "react";
import { useParams } from "react-router-dom";

const RoomDetails = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Room Details</div>;
};

export default RoomDetails;
