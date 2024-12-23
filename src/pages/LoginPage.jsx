import React, { useState, useEffect, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const LoginPage = () => {
  const { googleSignIn, signInUser, loading } = useContext(AuthContext);

  /////////////
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  /////////////
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginButtonState, setLoginButtonState] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(
      password
    );
    setLoginButtonState(email.length > 4 && passwordValid);
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInUser(email, password);
      setRedirectTo(from);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    // Removed Google sign-in logic
    console.log("Google sign-in attempted");
    await googleSignIn();
    setRedirectTo(from);
  };

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="card card-bordered rounded-md shadow-indigo-400 shadow-sm p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">{/* Removed logo */}</div>
          <h2 className="text-2xl font-bold text-center mb-2">Welcome back</h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Glad to see you again 👋 <br /> Login to your account below
          </p>
          <div className="loading w-full loading-ring loading-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card card-bordered rounded-md shadow-indigo-400 shadow-sm p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">{/* Removed logo */}</div>
        <h2 className="text-2xl font-bold text-center mb-2">Welcome back</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Glad to see you again 👋 <br /> Login to your account below
        </p>
        <button
          className="btn btn-outline w-full mb-4"
          onClick={handleGoogleSignIn}
          disabled={loading}>
          {loading ? (
            <span className="loading loading-ring loading-sm"></span>
          ) : (
            <FcGoogle size={24} />
          )}
          Continue with Google
        </button>
        <p className="text-center my-3">or</p>
        <form onSubmit={handleLogin}>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter email..."
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password..."
              className="input input-bordered w-full"
            />
          </div>
          <button
            className="btn btn-primary w-full"
            disabled={!loginButtonState || loading}>
            Login
          </button>
        </form>
        <div className="text-center mt-4 text-sm">
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-500 underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
