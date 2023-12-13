// Cart.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useCart } from "../components/CartContext";
import CartItem from "../components/cart/CartItem";
import PriceTable from "../components/cart/PriceTable";
import Layout from "../components/Layout/Layout";

const Cart = ({ navigation }) => {
  const { cartItems, addToCart, totalPrice, removeFromCart } = useCart();

  const handleIncrement = (item) => {
    addToCart(item);
  };

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  return (
    <Layout>
      <Text style={styles.heading}>
        {cartItems?.length > 0
          ? `You Have ${cartItems?.length} Item${
              cartItems?.length > 1 ? "s" : ""
            } Left In Your Cart`
          : "OOPS Your Cart Is EMPTY !"}
      </Text>
      {cartItems?.length > 0 && (
        <>
          <ScrollView>
            {cartItems?.map((item) => (
              <View key={item._id} style={styles.cartItem}>
                <Text>{item.name}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <TouchableOpacity onPress={() => handleIncrement(item)}>
                  <Text>Increment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemove(item)}>
                  <Text style={styles.removeButton}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.priceTablesContainer}>
            <PriceTable title={"Price"} price={999} />
            <PriceTable title={"Tax"} price={1} />
            <PriceTable title={"Shipping"} price={1} />
            <View style={styles.grandTotal}>
              <Text style={styles.grandTotalText}>Total: ${totalPrice}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.btnCheckout}
            onPress={() => navigation.navigate("checkout")}>
            <Text style={styles.btnCheckoutText}>CHECKOUT</Text>
          </TouchableOpacity>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    color: "green",
    marginTop: 10,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  removeButton: {
    color: "red",
    marginLeft: 10,
  },
  priceTablesContainer: {
    marginHorizontal: 20,
  },
  grandTotal: {
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#ffffff",
    padding: 5,
    margin: 5,
  },
  grandTotalText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  btnCheckout: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "#000000",
    width: "90%",
    marginHorizontal: 20,
    borderRadius: 20,
  },
  btnCheckoutText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Cart;
