import Firebase from "../config/firebase";

export const getCurrentUser = () => {
  console.log(Firebase.auth().currentUser);
  return Firebase.auth().currentUser;
};

export const CheckAuth = () => {
  Firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("is authenticated", user);
    } else {
      console.log("not authenticated");
    }
  });
};
export const SignUp = async ({ email, password }) => {
  try {
    const response = await Firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    );
  } catch (error) {
    throw error;
  }
};

export const SignIn = async ({ email, password }) => {
  try {
    const response = await Firebase.auth().signInWithEmailAndPassword(
      email,
      password
    );
    console.log("user signed in", response);
  } catch (error) {
    throw error;
  }
};

export const SignOut = async () => {
  try {
    await Firebase.auth().signOut();
  } catch (error) {
    throw error;
  }
};
