import {
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_DB_URL,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
  FB_MSG_SENDER_ID,
  FB_APP_ID,
  FB_MEASUREMENT_ID,
} from "react-native-dotenv";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  databaseURL: FB_DB_URL,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MSG_SENDER_ID,
  appId: FB_APP_ID,
  measurementId: FB_MEASUREMENT_ID,
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);
export const firestore = Firebase.firestore();

export default Firebase;
