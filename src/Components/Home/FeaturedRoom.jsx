import React, { useEffect, useState } from "react";
import axios from "axios";
import { HOST } from "../../host";

const FeaturedRoom = () => {
  const [rooms, setRooms] = useState([]);
  console.log(HOST);
  useEffect(() => {
    const fetchRooms = async () => {
      axios
        .get(`${HOST}/rooms`)

        .then((res) => {
          console.log(res.data);
          setRooms(res.data);
        });
    };
    fetchRooms();
  }, []);

  return <div className="my-6">Rooms number : {rooms.length}</div>;
};

export default FeaturedRoom;
