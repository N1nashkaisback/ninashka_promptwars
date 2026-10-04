import { initializeApp } from "firebase/app";
import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
} from "firebase/ai";

const firebaseConfig = {
  apiKey: "AIzaSyAGSWOb__UoCskfhqnckyUscitYL-0Z06o",
  authDomain: "mirror-1e3b8.firebaseapp.com",
  projectId: "mirror-1e3b8",
  storageBucket: "mirror-1e3b8.firebasestorage.app",
  messagingSenderId: "728471126407",
  appId: "1:728471126407:web:966ce740a38dffbffe5322",
  measurementId: "G-52HC7Q97DQ",
};

const firebaseApp = initializeApp(firebaseConfig);

const ai = getAI(firebaseApp, {
  backend: new GoogleAIBackend(),
});

export const model = getGenerativeModel(ai, {
  model: "gemini-3.8-flash",
});