import React, { createContext, useEffect, useState } from 'react';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
// import { db } from '../firebase/firebase.config';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import axios from 'axios';
// Create the AuthContext
export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign up with Gmail
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  const updateUserProfile = ({ name, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
            if(currUser){
              const userinfo={email:currUser.email}
            axios.post('http://localhost:3000/jwt', userinfo)
            .then((response) => {
              console.log(response.data.token);
              if(response.data.token){
                localStorage.setItem('access-token', response.data.token)
              }
            }).catch((error) => {
              console.log("error in post jwt:"+ error);
            })
      }  
      else{ 
        localStorage.removeItem('access-token')
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    createUser,
    signInWithGoogle,
    login,
    logout,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
