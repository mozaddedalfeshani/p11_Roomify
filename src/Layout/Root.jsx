import React from "react";
import NavBar from "../Components/Home/NavBar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <NavBar />
      <div className="w-11/12 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
