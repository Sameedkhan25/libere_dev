import { firestore } from "../../config/firebase";
import uuid from "react-native-uuid";
export const fetchShops = async (id) => {
  try {
    const shops = [];
    const querySnapshot = await firestore
      .collection("shops")
      .where("ownerId", "==", id)
      .get();

    querySnapshot.forEach((doc) => {
      shops.push(doc.data());
    });

    return shops;
  } catch (error) {
    throw error;
  }
};

export const addShop = async ({ address, location, ownerId }) => {
  try {
    const id = uuid.v4();
    const addedShop = {
      id,
      address,
      location,
      ownerId,
      created: new Date(),
    };
    await firestore.collection("shops").doc(id).set(addedShop);
    return addedShop;
  } catch (error) {
    throw error;
  }
};
