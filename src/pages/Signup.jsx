import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
    phoneNumber: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [borderColor, setBorderColor] = useState("rgb(0, 0, 0)");
  const navigate = useNavigate();

  useEffect(() => {
    const allFieldsFilled = Object.values(formFields).every(
      (field) => field !== ""
    );
    setIsFormValid(allFieldsFilled && !passwordError);
  }, [formFields, passwordError]);

  useEffect(() => {
    const interval = setInterval(() => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      setBorderColor(`rgb(${r}, ${g}, ${b})`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setFormFields((prevState) => ({ ...prevState, password: value }));
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 6 characters long and include both lowercase and uppercase letters."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formFields, null, 2));
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-8">
      <div
        className="card card-bordered shadow-sm shadow-indigo-400 rounded-lg p-4 sm:p-8 w-full max-w-md"
        style={{ borderColor: borderColor }}>
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-transparent text-white w-12 h-12 flex items-center justify-center rounded-full">
            {/* Remove the logo image */}
          </div>
        </div>

        {/* Heading */}
        <motion.h2
          className="text-2xl font-bold text-center mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sign up
        </motion.h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your details below to create your account and get started.
        </p>

        {/* Form */}
        <form className="grid grid-cols-1 gap-4" onSubmit={handleSignupSubmit}>
          {/* Full Name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="input input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="input input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>

          {/* Photo URL */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photoUrl"
              placeholder="Enter your photo URL"
              className="input input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>

          {/* Password */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          {/* Phone Number (Optional) */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Phone Number (Optional)</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="+45 1344-343"
              className="input input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>
        </form>

        {/* Buttons */}
        <div className="flex flex-col justify-between mt-6">
          <button
            type="submit"
            onClick={handleSignupSubmit}
            className="btn btn-primary w-full"
            disabled={!isFormValid}>
            Confirm
          </button>
          <h1 className="text-center my-2">or</h1>
          <button className="btn-outline btn btn-primary w-full">
            <FcGoogle size={24} />
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 text-sm">
          <p>
            Already have an account?
            <Link to="/login" className="text-purple-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
