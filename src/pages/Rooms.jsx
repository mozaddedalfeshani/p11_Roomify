import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/shared/Card";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [value, setValue] = useState("rooms");

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await axios.get(`http://localhost:9000/rooms`);
      setRooms(response.data);
    };
    fetchRooms();
  }, []);

  const handleRoomTypeChange = async (e) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    const endpoint = selectedValue === "rooms" ? "rooms" : `type/${selectedValue}`;
    const response = await axios.get(`http://localhost:9000/${endpoint}`);
    setRooms(response.data);
  };

  const handleSeeDetails = (roomId) => {
    // Add navigation or modal logic here
  };

  return (
    <div className="flex flex-col my-5 items-center justify-center container mx-auto">
      <h1 className="text-3xl font-bold my-2">All Rooms</h1>
      <div className="my-5 flex flex-row justify-between items-center w-full">
        <label htmlFor="rooms" className="mr-2">
          Select a room type:
        </label>
        <select
          id="rooms"
          name="rooms"
          value={value}
          onChange={handleRoomTypeChange}
          className="select select-bordered w-full max-w-xs">
          <option value="rooms">All Rooms</option>
          <option value="Deluxe King Room">Deluxe King Room</option>
          <option value="Standard Double Room">Standard Double Room</option>
          <option value="Premium Suite">Premium Suite</option>
          <option value="Family Room">Family Room</option>
          <option value="Single Economy Room">Single Economy Room</option>
          <option value="Luxury Villa">Luxury Villa</option>
          <option value="Executive Suite">Executive Suite</option>
          <option value="Honeymoon Suite">Honeymoon Suite</option>
          <option value="Beachfront Bungalow">Beachfront Bungalow</option>
        </select>
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
