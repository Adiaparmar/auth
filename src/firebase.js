import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEHHYbvBYZUe7v_LJOqn5qWLCg01H9Eok",
  authDomain: "auth-30958.firebaseapp.com",
  projectId: "auth-30958",
  storageBucket: "auth-30958.appspot.com",
  messagingSenderId: "26420675749",
  appId: "1:26420675749:web:01cd8702ec25fe246df94c",
};

firebase.initializeApp(firebaseConfig);

export const auth = getAuth();

export default firebase;
