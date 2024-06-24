import { initializeApp } from "firebase/app";
import { getFirestore , collection} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfzssO0gmRpZckcKQ6iSRjHAwm7QuIESA",
  authDomain: "gmeet-clone-afb27.firebaseapp.com",
  projectId: "gmeet-clone-afb27",
  storageBucket: "gmeet-clone-afb27.appspot.com",
  messagingSenderId: "482397531142",
  appId: "1:482397531142:web:1cb38ef1a319eedd1de787",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

export {app, firestore, auth, storage, collection };

