import React from "react";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";
import AUTH from "../constants";
import { PATHS } from "../../../urls";
import { USER_TYPE } from "../../../constants/keys";
import FlashNotification from "../../Flash/Flash";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignupScreen = ({ navigation }) => {

  const gotoLink = (link) => navigation.navigate(link);

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch({
      type: AUTH.SIGNUP,
      payload: {
        ...values,
        type: values.type ? USER_TYPE.SHOPKEEPER : USER_TYPE.CUSTOMER,
      },
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is empty";
    }
    if (!values.password) {
      errors.password = "Password can not be empty";
    }
    if (values.password != values.cPassword) {
      errors.cPassword = "Password does not match";
    }

    return errors;
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Signup</Text>
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

              <Field
                name="password"
                render={({ input, meta }) => (
                  <>
                    <View style={styles.inputView} >
                      <Icon name="lock" size={25} style={styles.icon} />
                      <TextInput  
                          {...input}
                          secureTextEntry
                          style={styles.inputText}
                          placeholder="Password"
                          placeholderTextColor="gray"/>
                    </View>
                    {meta.touched && meta.error && (
                      <Text style={styles.errors}>{meta.error}</Text>
                    )}
                  </>
                )}
              />

              <Field
                name="cPassword"
                render={({ input, meta }) => (
                  <>
                    <View style={styles.inputView} >
                      <Icon name="lock" size={25} style={styles.icon} />
                      <TextInput  
                          {...input}
                          secureTextEntry
                          style={styles.inputText}
                          placeholder="Confirm Password"
                          placeholderTextColor="gray"/>
                    </View>
                    {meta.touched && meta.error && (
                      <Text style={styles.errors}>{meta.error}</Text>
                    )}
                  </>
                )}
              />

              <Field
                name="type"
                render={({ input, meta }) => (
                  <>
                    <View style={styles.shopKeeperView}>
                      <Text style={styles.already}>is Shopkeeper?</Text>
                      <Switch
                        trackColor={{ false: "#ffffff", true: "#2fc3ea" }}
                        thumbColor={input.value ? "#ffffff" : "#2fc3ea"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => input.onChange(value)}
                        value={input.value}
                      />        
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
                <Text style={styles.btnText}>SignUp</Text>
              </TouchableOpacity>
              
              <View style={styles.rowView}>
                <Text style={styles.already}>Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => gotoLink(PATHS.Login)}
                >
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
              </View>
            
            </View>

          )}
        />
      </View>
      <FlashNotification />
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
  title:{
    fontSize:20,
    fontWeight:"bold",
    fontFamily:"Roboto",
    marginBottom:10
  },
  shopKeeperView:{
    marginTop:10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
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
  rowView:{
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
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
  already: {
    color:"gray",
    fontSize:14,
    fontFamily:"Roboto",
  },
});

export default SignupScreen;