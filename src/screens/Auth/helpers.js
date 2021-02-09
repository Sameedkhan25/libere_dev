import Firebase, { firestore } from "../../config/firebase";
import { USER_TYPE } from "../../constants/keys";
export const AuthListener = (callback) => {
  Firebase.auth().onAuthStateChanged(function (user) {
    if (callback) callback(user);
  });
};

export const getCurrentUser = () => {
  console.log("Current User", Firebase.auth().currentUser);
  return Firebase.auth().currentUser;
};

export const userSignup = async ({ email, password, type }) => {
  try {
    const response = await Firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const { user } = response;
    const uniqueId = user.uid;
    const batch = firestore.batch();
    const userDbRef = firestore.collection("users");
    const walletDbRef = firestore.collection("wallets");

    batch.set(userDbRef.doc(uniqueId), {
      id: uniqueId,
      email,
      type,
      completed: false,
    });

    batch.set(walletDbRef.doc(uniqueId), {
      id: uniqueId,
      credit: 0,
      userId: uniqueId,
    });

    await batch.commit();
    return;
  } catch (error) {
    throw error;
  }
};

export const userLogin = async ({ email, password }) => {
  try {
    const response = await Firebase.auth().signInWithEmailAndPassword(
      email,
      password
    );
    console.log("user loggedin", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const userLogout = async () => {
  try {
    await Firebase.auth().signOut();
    return null;
  } catch (error) {
    throw error;
  }
};
