import React from "react";
import { useSelector } from "react-redux";
import { USER_TYPE } from "../../../constants/keys";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Footer = (props) => {
  const { profile } = useSelector(
    (state) => ({
      profile: state.profile.profile,
    })
  );
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerView} onPress={props.onPressHome}>
        <SimpleLineIcons name="home" size={22} style={styles.icon} />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerView} onPress={props.onPressScan}>
        <MaterialCommunityIcons name="qrcode-scan" size={22} style={styles.icon} />
        <Text style={styles.footerText}>Scan</Text>
      </TouchableOpacity>
      {profile &&
        (profile.type == USER_TYPE.CUSTOMER ? (
          <>
            <TouchableOpacity style={styles.footerView} onPress={props.onPressProduct}>
              <FontAwesome5 name="wine-bottle" size={22} style={styles.icon} />
              <Text style={styles.footerText}>Bottle</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>

          </>
        ))}
      <TouchableOpacity style={styles.footerView} onPress={props.onPressProfile}>
        <MaterialIcons name="person-outline" size={25} style={styles.icon} />
        <Text style={styles.footerText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    footer: {
        width:"100%",
        height: 60,
    
        paddingHorizontal:20,
    
        flexDirection:"row",
        alignItems:"center",
        justifyContent: "space-between",
    
        backgroundColor: "#2fc3ea",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    footerView: {
        alignItems:"center",
    },
    footerText: {
        color:"#ffffff",
    
        fontSize:14,
        fontWeight:"bold",
        fontFamily:"Roboto",  
    },
    icon: {
        color:"#ffffff"
    }
});

export default Footer;