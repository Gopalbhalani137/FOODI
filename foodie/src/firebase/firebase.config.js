// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
console.log("API Key:", import.meta.env.VITE_APIKEY);
console.log("Project ID:", import.meta.env.VITE_PROJECTID);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };