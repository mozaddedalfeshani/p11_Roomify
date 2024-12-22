import React, { useEffect, useState } from "react";
import axios from "axios";
import { HOST } from "../../host";
import { data } from "react-router-dom";

const FeaturedRoom = () => {
  const [rooms, setRooms] = useState([21]);

  useEffect(() => {
    const fetchRooms = async () => {
      fetch("http://localhost:9000/rooms")
        .then((res) => res.json())
        .then((data) => setRooms(data));
    };
    fetchRooms();
  }, []);

  return <div className="my-6">{rooms.length}</div>;
};

export default FeaturedRoom;
