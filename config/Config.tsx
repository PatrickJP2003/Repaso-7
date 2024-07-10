
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth} from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtw1-INrh1Og7-YTr-NWigb8hChVd7p-8",
  authDomain: "app-1-2b43f.firebaseapp.com",
  databaseURL: "https://app-1-2b43f-default-rtdb.firebaseio.com",
  projectId: "app-1-2b43f",
  storageBucket: "app-1-2b43f.appspot.com",
  messagingSenderId: "563780395581",
  appId: "1:563780395581:web:6843dcac8fde6d0382c054"
};

const app = initializeApp(firebaseConfig);
 export const db = getDatabase(app);
 export const auth = getAuth();
 export const storage = getStorage();