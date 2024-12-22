import React, { createContext, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.init";

const provider = new GoogleAuthProvider();
//create auth context

const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // function to sign in with Google
  const googleSignIn = async () => {
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const data = {
    user,
    setUser,
    googleSignIn,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
