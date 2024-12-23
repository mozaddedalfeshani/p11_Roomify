import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import UserIcon from "../shared/UserIcon";

const NavBar = () => {
  const { user, LogOut } = useContext(AuthContext);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const signOutUser = async () => {
    try {
      await LogOut();
    } catch (error) {
      console.error("Error during sign out:", error); // Log the error
    }
  };
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const items = [
    <li
      key="home"
      className={`font-roboto font-medium ${
        theme === "dark" ? "text-white" : "text-black"
      }`}>
      <Link to="/">Home</Link>
    </li>,
    <li
      key="rooms"
      className={`font-roboto font-medium ${
        theme === "dark" ? "text-white" : "text-black"
      }`}>
      <Link to="/rooms">Rooms</Link>
    </li>,
    user && (
      <li
        key="myBookings"
        className={`font-roboto font-medium ${
          theme === "dark" ? "text-white" : "text-black"
        }`}>
        <Link to="/mybookings">My Bookings</Link>
      </li>
    ),
  ];

  return (
    <div>
      <div className="navbar bg-base-100 shadow p-3">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {items}
              <li
                key="auth"
                className={`font-roboto font-medium ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}>
                <Link to="/login">Login/Register</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            Roomify
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{items}</ul>
        </div>
        <div className="navbar-end">
          <button onClick={toggleTheme} className="btn btn-ghost rounded-full">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          {user ? (
            <div className="btn btn-ghost">
              <UserIcon user={user} />
            </div>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
