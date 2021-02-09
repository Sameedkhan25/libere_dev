import React, { useState } from "react";
import { USER_TYPE } from "../../../constants/keys";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Form, Field } from "react-final-form";
import PROFILE from "../constants";
import FlashNotification from "../../Flash/Flash";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Footer from "./Footer";
import { PATHS } from "../../../urls";

const ProfileScreen = ({ navigation }) => {
  const { profile, fetchingProfile, updatingProfile } = useSelector(
    (state) => ({
      profile: state.profile.profile,
      fetchingProfile: state.profile.fetchingProfile,
      updatingProfile: state.profile.updatingProfile,
    })
  );

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch({ type: PROFILE.UPDATE_PROFILE, payload: values });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is empty";
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
        <View style={styles.profileView}>
          <Image
            source={require('../../../../assets/splash.png')}  
            style={styles.image} 
          />
          <Text style={styles.nameText}>Name</Text>
          <View style={styles.locationView}>
            <MaterialIcons name="location-on" size={14} style={styles.locationIcon}/>
            <Text style={styles.locationText}>Location</Text>
          </View>
          <View style={styles.profileDetailView}>
            <View>
              <Text style={styles.text}>Credits</Text>
              <Text style={styles.number}>0</Text>
            </View>
            <View>
              <Text style={styles.text}>Bottles</Text>
              <Text style={styles.number}>0</Text>            
            </View>
            {profile &&
              (profile.type == USER_TYPE.CUSTOMER ? (
                <>
                </>
              ) : (
                <>
                  <View>
                    <Text style={styles.text}>Rating</Text>
                    <Text style={styles.number}>0</Text>
                  </View>
                </>
              ))}
          </View>
        </View>
        <ScrollView style={{width:"100%",paddingTop:5}}>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={profile}
            render={({ handleSubmit }) => (
              <View onSubmit={handleSubmit} style={{alignItems:"center",justifyContent:"center"}}>
                <View style={styles.inputContainer}>
                  <Text style={styles.lableText}>First Name</Text>
                    <Field
                      name="firstname"
                      render={({ input, meta }) => (
                        <>
                          <View style={styles.inputView} >
                            <TextInput  
                                {...input}
                              style={styles.inputText}
                              placeholder="First Name"
                              placeholderTextColor="gray"/>
                          </View>
                          {meta.touched && meta.error && (
                            <Text style={styles.errors}>{meta.error}</Text>
                          )}
                        </>
                      )}
                    />                   
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.lableText}>Last Name</Text>
                    <Field
                      name="lastname"
                      render={({ input, meta }) => (
                        <>
                          <View style={styles.inputView} >
                            <TextInput  
                              {...input}
                              style={styles.inputText}
                              placeholder="Last Name"
                              placeholderTextColor="gray"/>
                          </View>
                          {meta.touched && meta.error && (
                            <Text style={styles.errors}>{meta.error}</Text>
                          )}
                        </>
                      )}
                    />                   
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.lableText}>Date of Birth</Text>
                  <Field
                    name="dob"
                    render={({ input, meta }) => (
                      <>
                        <View style={styles.inputView} >
                          <TextInput  
                            {...input}
                            style={styles.inputText}
                            placeholder="Date of Birth"
                            placeholderTextColor="gray"/>
                        </View>
                        {meta.touched && meta.error && (
                          <Text style={styles.errors}>{meta.error}</Text>
                        )}
                      </>
                    )}
                  /> 
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.lableText}>Email Address</Text>
                  <Field
                    name="email"
                    render={({ input, meta }) => (
                      <>
                        <View style={styles.inputView} >
                          <TextInput  
                            {...input}
                            editable={false}
                            style={styles.inputText}
                            placeholder="Email Address"
                            placeholderTextColor="gray"/>
                        </View>
                        {meta.touched && meta.error && (
                          <Text style={styles.errors}>{meta.error}</Text>
                        )}
                      </>
                    )}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.lableText}>Residence</Text>
                  <Field
                    name="residence"
                    render={({ input, meta }) => (
                      <>
                        <View style={styles.inputView} >
                          <TextInput  
                            {...input}
                            style={styles.inputText}
                            placeholder="Residence"
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
                  {updatingProfile ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.btnText}>Save</Text>
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
  profileView: {
    width: "100%",
    height: 155,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#2fc3ea", 
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image:{
    width:80,
    height:80,
    borderRadius:40,
    backgroundColor: "#ffffff", 
  },
  nameText: {
    color: "#ffffff",
    fontSize: 14,
    marginVertical:3,
    fontFamily:"Roboto",
    alignSelf:"center",
  },
  locationView:{
    flexDirection: "row",
  },
  locationText: {
    color: "#ffffff",
    fontSize: 12,
    marginBottom:5,
    fontFamily:"Roboto",
    alignSelf:"center",
  },
  locationIcon: {
    color:"#ffffff",
    marginRight:2,
  },
  profileDetailView: {
    width: 296,
    height: 50,

    borderRadius: 20,
    backgroundColor: "#ffffff",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 12,
    fontFamily:"Roboto",
    alignSelf:"center",
  },
  number: {
    color: "#707070",
    fontSize: 12,
    fontFamily:"Roboto",
    alignSelf:"center",
  },
  lableText: {
    color: "#707070",
    fontSize: 12,
    marginVertical:2,
    fontFamily:"Roboto",
    alignSelf:"flex-start"  
  },
  inputView:{
    flexDirection: 'row',
    alignItems:"center",
    justifyContent:"center",

    width:296,
    height:37,

    padding:5,

    borderRadius:20,
    backgroundColor:"#ffffff",
  },
  inputText:{
    flex:1,
    height:35,
    paddingHorizontal:10,
    fontSize:14,
    fontFamily:"Roboto"
  },
  icon:{
    color:"#2fc3ea",
    marginHorizontal:5,
  },
  button: {
    width:296,
    height:37,
    marginVertical:10,
    borderRadius: 20,
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
  link: {
    color: "#2fc3ea",
    fontSize:14,
    fontFamily:"Roboto",
  },
  errors: {
    fontSize: 12,
    fontFamily:"Roboto",
    color: "red",
    marginTop:3,
    marginHorizontal:15,
  },
  inputContainer: {
    marginBottom: 5,
    alignItems:"flex-start",
    justifyContent:"flex-start"
  },
});

export default ProfileScreen;
