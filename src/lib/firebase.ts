import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AQUI_A_TUA_API_KEY",
  authDomain: "AQUI_O_TEU_AUTH_DOMAIN",
  projectId: "AQUI_O_TEU_PROJECT_ID",
  storageBucket: "AQUI_O_TEU_STORAGE_BUCKET",
  messagingSenderId: "AQUI_O_TEU_MESSAGING_SENDER_ID",
  appId: "AQUI_O_TEU_APP_ID",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);