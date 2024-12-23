import { createBrowserRouter } from "react-router-dom";
// ...existing code...
import Root from "../Layout/Root";
import { Link } from "react-router-dom"; // Add this import
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Signup from "../pages/Signup";
import PrivateProvider from "../provider/PrivateProvider";
import Rooms from "../pages/Rooms";
import RoomDetails from "../Components/shared/RoomDetails";
import axios from "axios";
import MyBooking from "../pages/MyBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "mybookings",
        element: (
          <PrivateProvider>
            <MyBooking />
          </PrivateProvider>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/room-details/:id",
        element: (
          <PrivateProvider>
            <RoomDetails />
          </PrivateProvider>
        ),
        loader: ({ params }) => {
          axios.get(`http://localhost:9000/room/${params.id}`);
        },
      },
    ],
  },
]);

export default router;
