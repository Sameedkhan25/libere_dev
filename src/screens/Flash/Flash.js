import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

const FlashNotification = () => {
  const { flashOn, text } = useSelector((state) => ({
    flashOn: state.flash.flashOn,
    text: state.flash.text,
  }));

  return (
    <View style={styles.container}>
      {flashOn ? (
        <View style={styles.flashMessage}>
          <Text style={{ color: "white" }}>{text}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#f8f9fa",
    justifyContent: "center",
    height: 40,
  },
  flashMessage: {
    position: "absolute",
    backgroundColor: "#2fc3ea",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontSize:14,
    height: 40,
    top: 0,
  },
});

export default FlashNotification;