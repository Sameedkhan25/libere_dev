import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import FlashNotification from "../../Flash/Flash";
import FLASH from "../../Flash/constants";
import Footer from "../../Home/screens/Footer";
import { PATHS } from "../../../urls";

function MapScreen({ navigation }) {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        setError("Permission to access location was denied");
        // dispatch({
        //   type: FLASH.FLASH,
        //   payload: "Permission to access location was denied",
        // });
        return;
      }

      let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
      const { coords } = location;
      setLocation(coords);
      setMapRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const _handleMapRegionChange = (mapRegion) => {
    setMapRegion(mapRegion);
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

  return (
    <>
      <View style={styles.container}>
        {error && (
          <View style={styles.error}>
            <Text>{error}</Text>
          </View>
        )}
        <MapView
          style={{ flex: 1, width: "100%" }}
          region={mapRegion}
        >
          {location && (
            <MapView.Marker
              title="currentLocation"
              description="user location"
              anchor={{x: 0, y: 0}}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          )}
        </MapView>
        <Footer onPressHome={onPressHome} onPressScan={onPressScan} onPressProduct={onPressProduct} onPressProfile={onPressProfile} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    backgroundColor: "grey",
    width: "100%",
  },
});
export default MapScreen;
