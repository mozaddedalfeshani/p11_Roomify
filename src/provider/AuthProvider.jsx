import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase.init";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

//create auth context

export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  ///////// All firebase functionality goes here //////////

  // Listen for authentication state to change.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user state when authentication state changes
      setLoading(false); // Set loading to false when authentication state is determined
    });
    return () => {
      unsubscribe(); // Cleanup the subscription on component unmount
    };
  }, [auth]);

  // function to sign in with Google
  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    } finally {
      setLoading(false);
    }
  };

  //

  const data = {
    user,
    setUser,
    googleSignIn,
    loading,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
