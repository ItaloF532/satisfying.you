import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { ENV } from "../const/Environments";

const firebaseConfig = {
  appId: "1:495706170404:android:a67ae3b6faa4837eefe4b1",
  apiKey: "AIzaSyDH55-hxF7vSqsAEVqLQ57yRWJUa3AKk6M",
  projectId: "dispositivos-moveis-edf9e",
  authDomain: "dispositivos-moveis-edf9e.firebaseapp.com",
  databaseURL: "https://dispositivos-moveis-edf9e.firebaseio.com",
  storageBucket: `dispositivos-moveis-edf9e.firebasestorage.app`,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth, firebaseApp };
