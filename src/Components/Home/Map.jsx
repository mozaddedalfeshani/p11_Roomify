import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [23.87160787095551, 90.40280073173706];

const Map = () => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Road 11, Sector 6, Dhaka Metropolitan, Dhaka District, Dhaka Division,
          1276, Bangladesh
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
