import React from "react";
import { Link } from "react-router-dom";

const errorImageUrl =
  "https://static.vecteezy.com/system/resources/previews/031/975/000/non_2x/modern-minimal-not-found-error-icon-oops-page-not-found-404-error-the-page-not-found-with-concept-cartoon-cut-theme-web-banner-link-to-empty-non-existent-page-workers-repairs-website-vector.jpg";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <img
        src={errorImageUrl}
        alt="Error"
        className="w-1/2 h-auto mb-4" // Make the image smaller
      />
      <p className="mb-4">Oops! The page you are looking for does not exist.</p>
      <Link to="/">
        <button className="btn btn-outline">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
