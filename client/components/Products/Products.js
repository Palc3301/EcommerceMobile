import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ProductsCard from "./ProductsCard";
import axios from "axios"; // Certifique-se de importar axios

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://192.168.31.183:5000/api/v1/product/get-all"
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error, show message, etc.
      }
    };

    fetchProducts();
  }, []); // Run only once on component mount

  return (
    <View>
      {products.map((p) => (
        <ProductsCard key={p._id} p={p} />
      ))}
    </View>
  );
};

export default Products;
