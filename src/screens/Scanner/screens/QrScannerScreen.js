import React, { useState, useEffect } from "react";
import { firestore } from "../../../config/firebase";
import { useSelector } from "react-redux";
import queryString from "query-string";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import PaymentForm from "./PaymentForm";
import { TextInput } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";

function QrScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [payee, setPayee] = useState(null);

  const [scanned, setScanned] = useState(false);

  const { wallet, profile, fetching, updating, user } = useSelector(
    (state) => ({
      user: state.auth.user,
      wallet: state.wallet.wallet,
    })
  );

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    const info = queryString.parse(data);
    const userInfo = await (
      await firestore.collection("users").doc(info.user).get()
    ).data();
    setPayee({ ...userInfo, shop: info.shop, payerId: user.uid });
    setScanned(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{flex: 1,alignItems: "center",justifyContent: "center",backgroundColor: "#f8f9fa"}}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <>
          <PaymentForm payee={payee} navigation={navigation} />
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        </>
      )}
    </View>
  );
}
export default QrScreen;
