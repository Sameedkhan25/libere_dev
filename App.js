import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import "./src/config/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import configureStore from "./src/store/configureStore";
import AUTH from "./src/screens/Auth/constants";
import LoginScreen from "./src/screens/Auth/screens/LoginScreen";
import SignupScreen from "./src/screens/Auth/screens/SignupScreen";
import ForgetScreen from "./src/screens/Auth/screens/ForgetScreen";
import SplashScreen from "./src/screens/Auth/screens/SplashScreen";
import HomeScreen from "./src/screens/Home/screens/HomeScreen";
import ProfileScreen from "./src/screens/Home/screens/ProfileScreen";
import ProductScreen from "./src/screens/Home/screens/ProductScreen";
import MapScreen from "./src/screens/Map/screens/MapScreen";
import QrScreen from "./src/screens/Scanner/screens/QrScannerScreen";
import {
  ShopsListScreen,
  RegisterShopScreen,
} from "./src/screens/Shopkepper/screens";

import { AuthListener } from "./src/screens/Auth/helpers";

import { PATHS } from "./src/urls";
import AddProductScreen from "./src/screens/Home/screens/AddProductScreen";

const Stack = createStackNavigator();

function App() {
  const dispatch = useDispatch();
  const { fetchingUser, currentUser, appInitialized } = useSelector(
    (state) => ({
      fetchingUser: state.auth.fetchingUser,
      currentUser: state.auth.user,
      appInitialized: state.auth.appInitialized,
    })
  );

  useEffect(() => {
    AuthListener(() => {
      dispatch({ type: AUTH.FETCH_AUTH });
    });
  }, []);

  if (!appInitialized && !currentUser) {
    return <SplashScreen />;
  }

  const options = { 
    title: "",
    headerTitleContainerStyle: {
      left:65,
    },
    headerTitleStyle: {
      color:"#ffffff",

      fontSize:16,
      fontFamily:"Roboto",
    },
    headerTintColor:"#ffffff",
    headerStyle: { 
      elevation: 0,
      backgroundColor : "#2fc3ea",
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
    }
  }

  return (
    <>
      <StatusBar backgroundColor='#0a89ab' />
      <NavigationContainer>
        <Stack.Navigator>
          {!currentUser ? (
            <>
              <Stack.Screen
                name={PATHS.Login}
                component={LoginScreen}
                options={{ headerShown: false, animationTypeForReplace: "push" }}
              />
              <Stack.Screen
                name={PATHS.Signup}
                component={SignupScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={PATHS.ForgetPassword}
                component={ForgetScreen}
                options={{ title:"", headerStyle: { backgroundColor : "#f8f9fa", elevation: 0 } }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={PATHS.Home}
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={PATHS.Profile}
                component={ProfileScreen}
                options={{ ...options,title:"Profile",headerStyle: { elevation: 0,backgroundColor : "#2fc3ea",borderBottomLeftRadius:0,borderBottomRightRadius:0}}}
              />
              <Stack.Screen
                name={PATHS.Product}
                component={ProductScreen}
                options={{ ...options,title:"Bottles"}}
              />
              <Stack.Screen
                name={PATHS.AddProduct}
                component={AddProductScreen}
                options={{ ...options,title:"Add Bottle"}}
              />
              <Stack.Screen
                name={PATHS.Map}
                component={MapScreen}
                options={{ ...options,title:"Map"}}
              />
              <Stack.Screen
                name={PATHS.QrScanner}
                component={QrScreen}
                options={{ ...options,title:"Scan"}}
              />
              <Stack.Screen
                name={PATHS.Shop}
                component={RegisterShopScreen}
                options={{ ...options,title:"Shop"}}
              />
              <Stack.Screen
                name={PATHS.Shops}
                component={ShopsListScreen}
                options={{ ...options,title:"Shops"}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const AppStoreWrapped = () => (
  <Provider store={configureStore}>
    <App />
  </Provider>
);
export default AppStoreWrapped;