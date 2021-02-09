import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import SHOP from "../constants";
import { Form, Field } from "react-final-form";
import FlashNotification from "../../Flash/Flash";
import FLASH from "../../Flash/constants";

function RegisterShop() {
  const dispatch = useDispatch();
  const { wallet, fetching, updating, user } = useSelector((state) => ({
    user: state.auth.user,
  }));

  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { coords } = location;
    setLocation({ longitude: coords.longitude, latitude: coords.latitude });
  };

  const onSubmit = (values) => {
    dispatch({
      type: SHOP.REGISTER_SHOP,
      payload: { ...values, location, ownerId: user.uid },
    });
  };
  const getLocation = () => {
    getLocationAsync();
  };

  const validate = (values) => {
    const errors = {};
    if (!values.address) {
      errors.address = "Email is empty";
    }

    return errors;
  };

  return (
    <>
      <View style={styles.container}>
        {error && (
          <View style={styles.error}>
            <Text>{error}</Text>
          </View>
        )}
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <View onSubmit={handleSubmit}>
              <View style={styles.inputContainer}>
                <Text>Address:</Text>
                <Field
                  name="address"
                  render={({ input, meta }) => (
                    <>
                      <TextInput
                        {...input}
                        style={styles.inputStyles}
                        placeholder="Address"
                      />
                      {meta.touched && meta.error && (
                        <Text style={styles.errors}>{meta.error}</Text>
                      )}
                    </>
                  )}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>Location:</Text>
                <TextInput
                  value={location.longitude.toString()}
                  style={styles.inputStyles}
                  editable={false}
                  placeholder="Longitude"
                />
                <TextInput
                  value={location.latitude.toString()}
                  editable={false}
                  style={styles.inputStyles}
                  placeholder="Latitude"
                />
              </View>
              <TouchableOpacity style={styles.location} onPress={getLocation}>
                <Text style={styles.btnText}>Get Location</Text>
              </TouchableOpacity>

              <TouchableOpacity
                type="submit"
                style={styles.button}
                onPress={handleSubmit}
              >
                <Text style={styles.btnText}>Add Shop</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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

export default RegisterShop;
