import { firestore } from "../../config/firebase";

export const makePayment = async ({ id, email, shop, amount, payerId }) => {
  try {
    const shops = [];
    const userWallet = await (
      await firestore.collection("wallets").doc(payerId).get()
    ).data();
    if (userWallet.credit < amount) {
      throw Error("Cannot make payment due to less balance!");
    }

    const otherUserWallet = await (
      await firestore.collection("wallets").doc(id).get()
    ).data();

    const batch = firestore.batch();
    batch.update(firestore.collection("wallets").doc(id), {
      credit: parseInt(otherUserWallet.credit) + parseInt(amount),
    });
    batch.update(firestore.collection("wallets").doc(payerId), {
      credit: userWallet.credit - amount,
    });
    console.log("sajid sajid");
    await batch.commit();

    return { ...userWallet, credit: userWallet.credit - amount };
  } catch (error) {
    throw error;
  }
};
