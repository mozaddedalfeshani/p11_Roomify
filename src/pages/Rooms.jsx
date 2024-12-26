import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/shared/Card";
import { HOST } from "../host";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [value, setValue] = useState("rooms");
  const [sortOrder, setSortOrder] = useState(""); // Default to empty string

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await axios.get(`${HOST}/rooms`);
      setRooms(response.data);
    };
    fetchRooms();
  }, []);

  const handleSeeDetails = (roomId) => {
    // Add navigation or modal logic here
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    if (e.target.value) {
      const sortedRooms = [...rooms].sort((a, b) => {
        return e.target.value === "asc" ? a.price - b.price : b.price - a.price;
      });
      setRooms(sortedRooms);
    }
  };

  return (
    <div className="flex flex-col my-5 items-center justify-center container mx-auto">
      <h1 className="text-3xl font-bold my-2">All Rooms</h1>
      <div className="w-full flex flex-col sm:flex-row justify-between mb-4">
        <span className="label-text mb-2 sm:mb-0">Sort by Price:</span>
        <div className="form-control w-full sm:w-auto max-w-xs">
          <select
            id="sort"
            value={sortOrder}
            onChange={handleSortChange}
            className="select select-bordered">
            <option value="">Select</option>
            <option value="asc">low to high</option>
            <option value="desc">High to low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
        {rooms.map((room) => (
          <Card
            key={room._id}
            roomCard={room}
            handleSeeDetails={handleSeeDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
