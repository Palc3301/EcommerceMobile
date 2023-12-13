import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../components/CartContext";

const Checkout = ({ navigation }) => {
  const { cartItems, totalPrice, removeFromCart } = useCart();

  const handleCOD = async () => {
    try {
      // Defina os dados do pedido estaticamente
      const orderData = {
        shippingInfo: {
          address: "somewhere",
          city: "Campina Grande",
          country: "Brasil",
        },
        orderItems: [
          {
            name: "iphone 16",
            price: 999,
            stock: 15,
            quantity: 1,
            image:
              "https://res.cloudinary.com/dwrgf4b2f/image/upload/v1702415238/aiyoxuglosmfrih0mrtz.png",
            product: "6578cb8557bb285c7ab21d39",
          },
        ],
        itemPrice: 999,
        tax: 1,
        shippingCharges: 1,
        totalAmount: 1001,
      };

      const response = await fetch(
        "http://192.168.31.183:5000/api/v1/orders/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Adicione headers de autenticação, se necessário
          },
          body: JSON.stringify(orderData),
        }
      );

      // Adicione esta verificação para o status da resposta
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      // Sucesso no processamento do pedido COD
      alert("Seu pedido (COD) foi colocado com sucesso!");
      cartItems.forEach((item) => removeFromCart(item));
      navigation.navigate("orders");
    } catch (error) {
      console.error("Erro ao processar o pedido COD:", error);

      // Adicione esta verificação para o tipo de conteúdo da resposta
      if (error.message.includes("JSON Parse error")) {
        alert(
          "Houve um problema ao processar o pedido COD. A resposta do servidor não é um JSON válido."
        );
      } else {
        alert(
          "Houve um problema ao processar o pedido COD. Por favor, tente novamente."
        );
      }
    }
  };
  const handleOnline = () => {
    alert("Your Redirecting to payment gateway");
    navigation.navigate("payment");
  };

  return (
    <Layout>
      <View style={Styles.container}>
        <Text style={Styles.heading}>Payment Options</Text>
        <Text style={Styles.price}>Total Amount : {totalPrice}$</Text>
        <View style={Styles.paymentCard}>
          <Text style={Styles.paymentHeading}>Select your Payment Mode</Text>
          <TouchableOpacity style={Styles.paymentBtn} onPress={handleCOD}>
            <Text style={Styles.paymentBtnText}>Cash On Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.paymentBtn} onPress={handleOnline}>
            <Text style={Styles.paymentBtnText}>
              Online (CREDIT | DEBIT CARD)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const Styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    color: "gray",
  },
  paymentCard: {
    backgroundColor: "#ffffff",
    width: "90%",
    borderRadius: 10,
    padding: 30,
    marginVertical: 10,
  },
  paymentHeading: {
    color: "gray",
    marginBottom: 10,
  },
  paymentBtn: {
    backgroundColor: "#000000",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 10,
  },
  paymentBtnText: {
    color: "#ffffff",
    textAlign: "center",
  },
});

export default Checkout;
