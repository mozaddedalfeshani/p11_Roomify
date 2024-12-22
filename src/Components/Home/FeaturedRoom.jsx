import React, { useEffect, useState } from "react";
import axios from "axios";
import { HOST } from "../../host";
import LatestCard from "../shared/LatestCard";

const FeaturedRoom = () => {
  const [rooms, setRooms] = useState([]);
  console.log(HOST);
  useEffect(() => {
    const fetchRooms = async () => {
      axios
        .get(`${HOST}/rooms`)

        .then((res) => {
          const lastSixRooms = res.data.slice(-6);
          setRooms(lastSixRooms);
        });
    };
    fetchRooms();
  }, []);

  return (
    <div className="my-6">
      <h1 className="text-4xl font-bold my-10 text-center">Featured Rooms</h1>
      <div className="container mx-auto grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {rooms.map((room, index) => {
          console.log(room);
          return <LatestCard key={index} visaCard={room} />;
        })}
      </div>
    </div>
  );
};

export default FeaturedRoom;
