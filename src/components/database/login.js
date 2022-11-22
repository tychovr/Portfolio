import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./connection.js";

const auth = getAuth(app);

const logIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      console.log(error);
      alert(error.message);
    }
  };

  export { logIn, auth };