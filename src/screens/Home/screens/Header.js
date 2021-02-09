import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = (props) => {
    return (
      <View style={styles.header}>
        <View style={styles.homeView}>
          <MaterialIcons name="menu" size={35} style={styles.icon} />
          <Text style={styles.homeText}>Home</Text>
        </View>
        <View style={styles.mapView}>
          <MaterialCommunityIcons name="map-marker-radius" size={28} style={styles.icon} onPress={props.onPressMap} />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    header: {
      width:"100%",
      height: 60,
  
      paddingHorizontal:20,
  
      flexDirection:"row",
      alignItems:"center",
      justifyContent: "space-between",
  
      backgroundColor: "#2fc3ea",
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
    },
    homeView: {
      flexDirection:"row",
      alignItems:"center",
      justifyContent: "flex-start",
    },
    homeText: {
      color:"#ffffff",
  
      fontSize:16,
      fontFamily:"Roboto",
      
      marginLeft:10
    },
    mapView: {
      flexDirection:"row",
      alignItems:"center",
      justifyContent: "flex-end",
    },
    icon: {
      color:"#ffffff"
    }
});

export default Header;