import AsyncLocalStorage from '@createnextapp/async-local-storage'
import db from "./connection.js";

const logIn = async (email, password) => {

  const { data, error } = await db.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Error: ", error.message);
  } else {
    console.log("Logged in successfully!");
    await AsyncLocalStorage.setItem("user", data);
  }
};

export { logIn };
