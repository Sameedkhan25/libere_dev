import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const ForgetScreen = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email can not be empty";
    }

    return errors;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <View onSubmit={handleSubmit}>

            <Field
              name="email"
              render={({ input, meta }) => (
                <>
                  <View style={styles.inputView} >
                    <Icon name="mail" size={25} style={styles.icon} />
                    <TextInput  
                        {...input}
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

            <TouchableOpacity
              type="submit"
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.btnText}>Send</Text>
            </TouchableOpacity>

          </View>
        )}
      />
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
  title:{
    fontSize:20,
    fontWeight:"bold",
    fontFamily:"Roboto",
    marginBottom:10
  },
  inputView:{
    flexDirection: 'row',
    justifyContent:"center",

    width:313,
    height:45,

    padding:5,
    marginTop:10,

    borderRadius:35,
    backgroundColor:"#ffffff",
  },
  inputText:{
    flex:1,
    height:35,
    padding:5,
    fontSize:14,
    fontFamily:"Roboto"
  },
  icon:{
    color:"#2fc3ea",
    marginTop:4,
    marginLeft:5,
  },
  button: {
    width:313,
    height:45,
    marginVertical:10,
    borderRadius: 35,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#2fc3ea",
  },
  btnText: {
    color: "white",
    fontSize: 14,
    fontFamily:"Roboto",
  },
  errors: {
    fontSize: 12,
    fontFamily:"Roboto",
    color: "red",
    marginTop:3,
    marginHorizontal:15,
  },
});

export default ForgetScreen;