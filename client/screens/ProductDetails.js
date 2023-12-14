import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import Layout from "../components/Layout/Layout";

const ProductDetails = ({ route }) => {
  const [pDetails, setPDetails] = useState({});
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productId = route.params._id;
        const response = await axios.get(
          `http://192.168.31.183:5000/api/v1/product/${productId}`
        );
        setPDetails(response.data.product); // Assumindo que o backend retorna um objeto 'product'
      } catch (error) {
        console.error("Erro ao buscar detalhes do produto:", error);
        Alert.alert("Erro ao buscar detalhes do produto");
      }
    };

    fetchProductDetails();
  }, [route.params._id]);

  const handleAddQty = () => {
    if (qty === 10)
      return Alert.alert("Você não pode adicionar mais de 10 unidades");
    setQty((prev) => prev + 1);
  };

  const handleRemoveQty = () => {
    if (qty <= 1) return;
    setQty((prev) => prev - 1);
  };

  const addToCart = async () => {
    try {
      // Enviar uma solicitação para criar um pedido no servidor
      const response = await axios.post(
        "http://110.5.3.131:5000/api/v1/order/create",
        {
          shippingInfo: {
            /* suas informações de envio */
          },
          orderItems: [
            {
              product: pDetails._id,
              quantity: qty,
            },
          ],
          paymentMethod: "sua forma de pagamento",
          paymentInfo: {
            /* suas informações de pagamento */
          },
          itemPrice: pDetails.price * qty, // ou o preço real do item
          tax: 0, // ou o imposto real
          shippingCharges: 0, // ou as despesas reais de envio
          totalAmount: pDetails.price * qty, // ou o valor total real
        }
      );

      Alert.alert(response.data.message);
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      Alert.alert("Erro ao adicionar ao carrinho");
    }
  };

  return (
    <Layout>
      <Image source={{ uri: pDetails.imageUrl }} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>{pDetails.name}</Text>
        <Text style={styles.title}>Preço: {pDetails.price} $</Text>
        <Text style={styles.desc}>Descrição: {pDetails.description} $</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnCart}
            onPress={addToCart}
            disabled={pDetails.quantity <= 0}>
            <Text style={styles.btnCartText}>
              {pDetails.quantity > 0
                ? "ADICIONAR AO CARRINHO"
                : "FORA DE ESTOQUE"}
            </Text>
          </TouchableOpacity>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
              <Text style={styles.btnQtyText}>-</Text>
            </TouchableOpacity>
            <Text>{qty}</Text>
            <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
              <Text style={styles.btnQtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  container: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    textAlign: "left",
  },
  desc: {
    fontSize: 12,
    textTransform: "capitalize",
    textAlign: "justify",
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  btnCart: {
    width: 180,
    backgroundColor: "#000000",
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
  },
  btnCartText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  btnQty: {
    backgroundColor: "lightgray",
    width: 40,
    alignItems: "center",
    marginHorizontal: 10,
  },
  btnQtyText: {
    fontSize: 20,
  },
});

export default ProductDetails;
