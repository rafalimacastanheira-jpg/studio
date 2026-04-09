import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhMnnFkAg99pwDTIttSaJ1l6uVTzjeiog",
  authDomain: "studio-7434163111-7759.firebaseapp.com",
  projectId: "studio-7434163111-7759",
  storageBucket: "studio-7434163111-7759.firebasestorage.app",
  messagingSenderId: "358988718023",
  appId: "1:358988718023:web:6629caa9cb136bcf8c83e2",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);