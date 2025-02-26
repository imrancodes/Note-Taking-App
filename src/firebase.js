import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAU96sIhibStAz_QBGssTtRyocU_qPuHZ4",
  authDomain: "notes-app-e546e.firebaseapp.com",
  projectId: "notes-app-e546e",
  storageBucket: "notes-app-e546e.firebasestorage.app",
  messagingSenderId: "209544753604",
  appId: "1:209544753604:web:764d7862428da943bc7491",
  dataBaseURL: "https://notes-app-e546e-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);