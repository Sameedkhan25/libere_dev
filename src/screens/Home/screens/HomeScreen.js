import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import * as Permissions from "expo-permissions";
import { USER_TYPE } from "../../../constants/keys";
import FlashNotification from "../../Flash/Flash";
import PROFILE, { WALLET, PRODUCTS } from "../constants";
import AUTH from "../../Auth/constants";
import { PATHS } from "../../../urls";
import Header from "./Header";
import Footer from "./Footer";
const HomeScreen = ({ navigation }) => {
  const { wallet, profile, fetching, updating, user } = useSelector(
    (state) => ({
      user: state.auth.user,
      wallet: state.wallet.wallet,
      profile: state.profile.profile,
      fetching: state.wallet.fetchingWallet,
      updating: state.wallet.updatingWallet,
    })
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const GetPermissions = async () => {
      if (user) {
        dispatch({ type: WALLET.FETCH_WALLET, payload: user.uid });
        dispatch({ type: PROFILE.FETCH_PROFILE, payload: user.uid });
      }
      try {
        const permission = await Permissions.askAsync(
          Permissions.CAMERA,
          Permissions.LOCATION
        );
        if (permission && permission.status != "granted") {
          alert(
            "This app uses camera for scanning and user location, please grant location and camera permissions through settings"
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    GetPermissions();
  }, []);

  const logout = () => {
    dispatch({ type: AUTH.LOGOUT, payload: user.uid });
  };

  const onPressHome = () => {
    navigation.navigate(PATHS.Home)
  }

  const onPressScan = () => {
    navigation.navigate(PATHS.QrScanner)
  }

  const onPressProduct = () => {
    navigation.navigate(PATHS.Product)
  }

  const onPressProfile = () => {
    navigation.navigate(PATHS.Profile)
  }

  const onPressMap = () => {
    navigation.navigate(PATHS.Map)
  }

  console.disableYellowBox=true;

  return (
    <>
      <View style={styles.container}>
        <Header onPressMap={onPressMap} />
        <ScrollView style={{width:"100%"}}>
          <FlashNotification />
          <View style={{alignItems:"center",justifyContent:"center"}}>
            <TouchableOpacity style={styles.tab}>
              <Text>Credit: {wallet && wallet.credit}</Text>
            </TouchableOpacity>
            {profile &&
              (profile.type == USER_TYPE.CUSTOMER ? (
                <>

                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(PATHS.Shop)}
                    style={styles.tab}
                  >
                    <Text>Add Shop</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(PATHS.Shops)}
                    style={styles.tab}
                  >
                    <Text>Shops List</Text>
                  </TouchableOpacity>
                </>
              ))}
            <TouchableOpacity onPress={() => logout()} style={styles.button}>
              <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer onPressHome={onPressHome} onPressScan={onPressScan} onPressProduct={onPressProduct} onPressProfile={onPressProfile} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    width:326,
    height:98,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "white",
    padding: 30,
    margin:10,
    borderRadius:20,
  },
  button: {
    width:326,
    height:37,
    marginVertical:10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#2fc3ea",
  },
  btnText: {
    color: "white",
    fontSize: 14,
    fontWeight:"bold",
    fontFamily:"Roboto",
  },
});

export default HomeScreen;
