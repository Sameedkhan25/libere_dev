import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

const SplashScreen = () => {

  console.disableYellowBox=true;
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#0a89ab' />
      <Text>LIBERE APP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;