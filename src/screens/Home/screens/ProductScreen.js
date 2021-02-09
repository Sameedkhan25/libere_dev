import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PRODUCTS } from "../constants";
import FlashNotification from "../../Flash/Flash";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Footer from "./Footer";
import { PATHS } from "../../../urls";

function Item({ title, size, serialNumber }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>Name: {title}</Text>
      <Text style={styles.title}>Serial Number: {serialNumber}</Text>
      <Text style={styles.title}>Size: {size}</Text>
    </View>
  );
}
const ProductScreen = ({ navigation }) => {
  const { profile, products, fetchingProducts } = useSelector(
    (state) => ({
      profile: state.profile.profile,
      products: state.product.products,
      fetchingProducts: state.product.fetchingProducts,
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

  const onPressAddProduct = () => {
    navigation.navigate(PATHS.AddProduct)
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{width:"100%"}}>
          <SafeAreaView style={styles.scroll}>
            {fetchingProducts ? (
              <ActivityIndicator />
            ) : (
              <>
                {products.length ? (
                  <FlatList
                    data={products}
                    renderItem={({ item }) => (
                      <Item
                        title={item.title}
                        serialNumber={item.serialNumber}
                        size={item.size}
                      />
                    )}
                    keyExtractor={(item) => item.id}
                  />
                ) : (
                  <Text>No Product Added</Text>
                )}
              </>
            )}
          </SafeAreaView>
          <FlashNotification />
        </ScrollView>
        <AntDesign name="pluscircle" size={40} style={styles.iconAdd} onPress={onPressAddProduct} />
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
  iconAdd: {
    position: "absolute",
    bottom: 80,
    right: 20,
    color: "#2fc3ea",
  },
  scroll: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  item: {
    backgroundColor: "#11293F",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    color: "white",
  },
});

export default ProductScreen;