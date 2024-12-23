import React, { useState, useEffect, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [borderColor, setBorderColor] = useState("rgb(0, 0, 0)");
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { createAccount, signInUser, googleSignIn, user, loading } =
    useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate(from);
    }
    setInitialLoading(false);
  }, [user, navigate, from]);

  useEffect(() => {
    const allFieldsFilled = Object.values(formFields).every(
      (field) => field !== ""
    );
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    setIsFormValid(
      allFieldsFilled && !passwordError && passwordRegex.test(password)
    );
  }, [formFields, passwordError, password]);

  useEffect(() => {
    const interval = setInterval(() => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      setBorderColor(`rgb(${r}, ${g}, ${b})`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGoogleSign = async () => {
    try {
      await googleSignIn();
      if (user) {
        navigate(from);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setFormFields((prevState) => ({ ...prevState, password: value }));
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 6 characters long and include lowercase, uppercase letters, and a number."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAccount(
        formFields.email,
        formFields.password,
        formFields.name,
        formFields.photoUrl
      );
      alert("Signup successful!");
      navigate(from);
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup error: " + error.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInUser(formFields.email, formFields.password);
      navigate(from);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed: " + error.message);
    }
  };

  if (loading || initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring loading-2xl"></span>
      </div>
    );
  }

  if (user) {
    return null; // Return null if user exists to prevent showing the login card
  }

  return (
    <div className="flex items-center justify-center p-4 sm:p-8">
      <div
        className="card card-bordered shadow-sm shadow-indigo-400 rounded-lg p-4 sm:p-8 w-full max-w-md"
        style={{ borderColor: borderColor }}>
        <div className="flex justify-center mb-6">
          <div className="bg-transparent text-white w-12 h-12 flex items-center justify-center rounded-full">
            {/* Remove the logo image */}
          </div>
        </div>

        <motion.h2
          className="text-2xl font-bold text-center mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          {isSignup ? "Sign up" : "Login"}
        </motion.h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          {isSignup
            ? "Enter your details below to create your account and get started."
            : "Glad to see you again 👋 Login to your account below"}
        </p>

        <form
          className="grid grid-cols-1 gap-4"
          onSubmit={isSignup ? handleSignupSubmit : handleLoginSubmit}>
          {isSignup && (
            <>
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
            </>
          )}
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
          <button type="submit" className="btn btn-primary w-full">
            {isSignup ? "Sign up" : "Login"}
          </button>
        </form>

        <div className="flex flex-col justify-between mt-6">
          <h1 className="text-center my-2">or</h1>
          <button
            className="btn-outline btn btn-primary w-full"
            onClick={handleGoogleSign}>
            <FcGoogle size={24} />
            Continue with Google
          </button>
        </div>

        <div className="text-center mt-4 text-sm">
          <p>
            {isSignup ? "Already have an account?" : "Don’t have an account?"}
            <span
              onClick={() => setIsSignup(!isSignup)}
              className="text-purple-500 underline cursor-pointer">
              {isSignup ? " Login" : " Sign up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
