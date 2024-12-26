import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.init";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

//create auth context

export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  ///////// All firebase functionality goes here //////////

  // Listen for authentication state to change.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user state when authentication state changes
      // call /jwt for set cookie again

      setLoading(false); // Set loading to false when authentication state is determined
    });
    return () => {
      // set cookie again when user is logged in

      unsubscribe(); // Cleanup the subscription on component unmount
    };
  }, [auth]);

  // function to sign in with Google
  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result.user; // Return the user data
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      throw error; // Rethrow the error to be handled by the caller
    } finally {
      setLoading(false);
    }
  };

  // Email and passwrod login
  // Sign in with email and password
  const signInUser = (email, password) => {
    return new Promise((resolve, reject) => {
      if (!email) {
        reject("Email is required");
        return;
      }
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          setUser(result.user); // Set the user state with the authenticated user

          resolve(result.user); // Resolve the promise with the user data
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error("Error signing in: " + errorMessage); // Log wrong credentials

          reject(errorMessage); // Reject the promise with the error message
        });
    });
  };

  // function to create account with email and password and store user image link and name
  const createAccount = (email, password, name, photoURL) => {
    return new Promise((resolve, reject) => {
      if (!email) {
        reject("Email is required");
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          updateProfile(result.user, {
            displayName: name,
            photoURL: photoURL,
          });
          resolve(result.user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error("Error creating account: " + errorMessage);
          reject(errorMessage);
        });
    });
  };

  //
  const LogOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during sign out:", error); // Log the error
    }
  };

  const data = {
    user,
    setUser,
    googleSignIn,
    signInUser, // Add signInUser to the context data
    createAccount, // Add createAccount to the context data
    loading,
    LogOut, // Ensure LogOut is added to the context data
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
