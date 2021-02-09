import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";
import PAYMENT from "../constants";
import FlashNotification from "../../Flash/Flash";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { PATHS } from "../../../urls";

const PaymentForm = ({ navigation, payee }) => {
  const gotoLink = (link) => navigation.navigate(link);
  const [paying, setPaying] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    setPaying(true);
    dispatch({
      type: PAYMENT.PAYMENT,
      payload: { ...values, ...payee },
      successCb: () => {
        setPaying(false);
        gotoLink(PATHS.Home);
      },
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.amount) {
      errors.amount = "Amount is required";
    }

    if (!parseInt(values.amount)) {
      errors.amount = "Must be integer";
    } else if (values.amount <= 0) {
      errors.amount = "Must be greater than 0";
    }

    return errors;
  };

  return (
    <>
      <View style={styles.container}>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <View onSubmit={handleSubmit}>
              <View style={styles.inputContainer}>
                <Text>Amount:</Text>
                <Field
                  name="amount"
                  render={({ input, meta }) => (
                    <>
                      <TextInput
                        {...input}
                        style={styles.inputStyles}
                        placeholder="Amount"
                        type="numeric"
                      />
                      {meta.touched && meta.error && (
                        <Text style={styles.errors}>{meta.error}</Text>
                      )}
                    </>
                  )}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>To: {payee.email}</Text>
              </View>
              <TouchableOpacity
                type="submit"
                style={styles.button}
                onPress={handleSubmit}
                disabled={paying}
              >
                <Text style={styles.btnText}>Proceed</Text>
              </TouchableOpacity>
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
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginVertical: 50,
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#06962A",
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 10,
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

export default PaymentForm;
