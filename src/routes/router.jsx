import { createBrowserRouter } from "react-router-dom";
// ...existing code...
import Root from "../Layout/Root";
import { Link } from "react-router-dom"; // Add this import

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/rooms",
        element: <h1>room</h1>,
      },
      {
        path: "mybookings",
        element: <h1>mybookings</h1>,
      },
    ],
  },
]);

export default router;
