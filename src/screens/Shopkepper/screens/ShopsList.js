import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Location from "expo-location";
import SHOP from "../constants";
import { Form, Field } from "react-final-form";
import FlashNotification from "../../Flash/Flash";
import FLASH from "../../Flash/constants";

function ShopsList() {
  const dispatch = useDispatch();
  const { shops, fetchingShops, addingShop, user } = useSelector((state) => ({
    user: state.auth.user,
    shops: state.shop.shops,
    fetchingShops: state.shop.fetchingShops,
    addingShop: state.shop.addingShop,
  }));

  useEffect(() => {
    dispatch({
      type: SHOP.FETCH_SHOPS,
      payload: user.uid,
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        {addingShop ? (
          <Text>Loading</Text>
        ) : (
          <View>
            {shops && shops.length ? (
              <View>
                {shops.map((shop, index) => (
                  <View key={shop.id} style={styles.card}>
                    <Text>Shop# {index + 1}</Text>
                    <Text>Address: {shop.address}</Text>
                    <QRCode
                      size={200}
                      value={`?user=${shop.ownerId}&shop=${shop.id}`}
                    />
                  </View>
                ))}
              </View>
            ) : (
              <Text>No Shops added</Text>
            )}
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginVertical: 50,
  },
  card: {
    backgroundColor: "white",
    padding: 30,
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#06962A",
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  location: {
    alignItems: "center",
    backgroundColor: "#11293F",
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  btnText: {
    color: "white",
    fontSize: 22,
  },
  link: {
    marginTop: 10,
    color: "blue",
    fontStyle: "italic",
  },
  errors: {
    fontSize: 10,
    color: "red",
  },
  inputContainer: {
    padding: 10,
    marginBottom: 20,
  },
  inputStyles: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 10,
  },
});

export default ShopsList;
