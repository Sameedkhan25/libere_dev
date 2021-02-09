import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { PRODUCTS } from "../constants";
import FlashNotification from "../../Flash/Flash";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Footer from "./Footer";
import { PATHS } from "../../../urls";

const AddProductScreen = ({ navigation }) => {
  const { profile, addingProduct } = useSelector(
    (state) => ({
      profile: state.profile.profile,
      addingProduct: state.product.addingProduct,
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: PRODUCTS.FETCH_PRODUCTS, payload: profile.id });
  }, []);

  const onSubmit = (values) => {
    dispatch({
      type: PRODUCTS.ADD_PRODUCT,
      payload: { serialNumber: values.serialNumber, ownerId: profile.id },
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.serialNumber) {
      errors.serialNumber = "Serial number is empty";
    }

    return errors;
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
        <ScrollView style={{width:"100%"}}>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
              <View onSubmit={handleSubmit} style={{alignItems:"center",justifyContent:"center"}}>
                <View style={styles.inputContainer}>
                  <Text style={styles.lableText}>Serial No</Text>
                  <Field
                      name="serialNumber"
                      render={({ input, meta }) => (
                        <>
                          <View style={styles.inputView} >
                            <TextInput  
                                {...input}
                              style={styles.inputText}
                              placeholder="Serial No"
                              placeholderTextColor="gray"/>
                          </View>
                          {meta.touched && meta.error && (
                            <Text style={styles.errors}>{meta.error}</Text>
                          )}
                        </>
                      )}
                    /> 
                </View>
                <TouchableOpacity
                  type="submit"
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  {addingProduct ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.btnText}>Add</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          />
          <FlashNotification />
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
  lableText: {
    color: "#707070",
    fontSize: 12,
    marginTop:10,
    marginBottom:3,
    fontFamily:"Roboto",
    alignSelf:"flex-start"  
  },
  inputView:{
    flexDirection: 'row',
    alignItems:"center",
    justifyContent:"center",

    width:322,
    height:45,

    padding:5,

    borderRadius:5,
    backgroundColor:"#ffffff",
  },
  inputText:{
    flex:1,
    height:35,
    padding:5,
    fontSize:14,
    fontFamily:"Roboto"
  },
  button: {
    width:322,
    height:35,
    marginVertical:10,
    borderRadius: 5,
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
  errors: {
    fontSize: 12,
    fontFamily:"Roboto",
    color: "red",
    marginTop:3,
  },
  inputContainer: {
    marginBottom: 10,
    alignItems:"flex-start",
    justifyContent:"flex-start"
  },
});

export default AddProductScreen;