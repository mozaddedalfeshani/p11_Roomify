import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { use } from "react";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`http://localhost:9000/roomEmail/${user.email}`).then((res) => {
        console.log("data", res.data);
        setData(res.data);
      });
    };
    fetchData();
  }, []);

  const handleCancel = (room) => {
    setRoomToCancel(room);
    setShowModal(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold my-2">My Bookings</h1>
    </div>
  );
};

export default MyBooking;
