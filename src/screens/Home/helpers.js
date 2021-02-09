import { firestore } from "../../config/firebase";
import { REWARD_PURCHASE } from "../../constants/keys";

export const fetchProfile = async (id) => {
  const profile = await (
    await firestore.collection("users").doc(id).get()
  ).data();
  return profile;
};

export const updateProfile = async ({
  id,
  firstname,
  lastname,
  residence,
  gender,
  dob,
}) => {
  try {
    const updatedProfile = {};
    if (firstname) updatedProfile.firstname = firstname;
    if (lastname) updatedProfile.lastname = lastname;
    if (residence) updatedProfile.residence = residence;
    if (gender) updatedProfile.gender = gender;
    if (dob) updatedProfile.dob = dob;

    const dbRef = firestore.collection("users");
    await dbRef.doc(id).update({
      id,
      ...updatedProfile,
      completed: true,
    });
    return;
  } catch (error) {
    throw error;
  }
};

export const fetchProducts = async (id) => {
  try {
    const products = [];
    const querySnapshot = await firestore
      .collection("products")
      .where("ownerId", "==", id)
      .get();

    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });

    return products;
  } catch (error) {
    throw error;
  }
};

export const addOwnerToProduct = async ({ ownerId, serialNumber }) => {
  try {
    const dbProductRef = firestore.collection("products");
    const dbWalletRef = firestore.collection("wallets");
    const dbBatch = firestore.batch();

    let update = null;
    const wallet = await (await dbWalletRef.doc(ownerId).get()).data();

    const querySnapshot = await dbProductRef
      .where("serialNumber", "==", serialNumber.trim())
      .get();

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        update = doc.data();
        if (update.isAssigned) {
          throw Error("Error: Already assigned!");
        }
        update.ownerId = ownerId;
        update.isAssigned = true;

        dbBatch.update(dbProductRef.doc(update.id), update);
        dbBatch.update(dbWalletRef.doc(wallet.id), {
          ...wallet,
          credit: wallet.credit + REWARD_PURCHASE,
        });
      });

      await dbBatch.commit();
      return { product: update, reward: REWARD_PURCHASE };
    } else {
      throw Error("No Record found!");
    }
  } catch (error) {
    throw error;
  }
};

export const fetchWallet = async (id) => {
  const wallet = await (
    await firestore.collection("wallets").doc(id).get()
  ).data();
  return wallet;
};

export const updateWallet = async ({ walletId, amount }) => {
  try {
    const dbRef = firestore.collection("wallets");
    const userWallet = await dbRef.doc(walletId).update({ amount });
    return userWallet;
  } catch (error) {
    throw error;
  }
};
