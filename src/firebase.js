import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  // apiKey: "AIzaSyBeOgTjgtecfVmK4XuN0wHkIqLXCj37jEA",
  // authDomain: "swd392-group4.firebaseapp.com",
  // projectId: "swd392-group4",
  // storageBucket: "swd392-group4.appspot.com",
  // messagingSenderId: "950926349970",
  // appId: "1:950926349970:web:c69506887a568923c4784b",
  // measurementId: "G-NZY9PPMMSN"


  apiKey: "AIzaSyDSEdJ4ifHlPk5MpLBMlciiTwLaNrIKApA",
  authDomain: "ojt-swd-svfpt.firebaseapp.com",
  projectId: "ojt-swd-svfpt",
  storageBucket: "ojt-swd-svfpt.appspot.com",
  messagingSenderId: "746409234802",
  appId: "1:746409234802:web:cd30ca174a3aacb8558deb",
  measurementId: "G-RGDVSLJ9LR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
// export default {app,storage};