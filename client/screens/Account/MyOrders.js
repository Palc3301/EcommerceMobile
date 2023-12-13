// No arquivo MyOrders.js
import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import OrderItem from "../../components/Form/OrderItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const authToken = await getUserAuthToken();

        const response = await axios.get(
          "http://192.168.31.183:5000/api/v1/order/get-all-orders",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        console.log("Resposta:", response.data);

        setOrders(response.data.orders);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        // Manipular erro, mostrar mensagem, etc.
      }
    };

    fetchOrders();
  }, []);

  const getUserAuthToken = async () => {
    try {
      // Obtém o token de autenticação do AsyncStorage
      const token = await AsyncStorage.getItem("userAuthToken");

      if (token) {
        // Se o token existir, retorna o token
        return token;
      } else {
        // Se o token não existir, você pode lidar com isso de acordo com seus requisitos
        // Por exemplo, redirecionar para a tela de login
        // navigation.navigate("login");
        return null;
      }
    } catch (error) {
      console.error("Erro ao obter token do AsyncStorage:", error);
      // Tratar erro, por exemplo, redirecionar para a tela de login
      // navigation.navigate("login");
      return null;
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>Meus Pedidos</Text>
        <ScrollView>
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  heading: {
    textAlign: "center",
    color: "gray",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default MyOrders;
