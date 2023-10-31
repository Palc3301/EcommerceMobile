import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Layout from "../components/Layout/Layout";
import Categories from "../components/Category/Categories";

const Home = () => {
  return (
    <Layout>
      <Categories/>
      <View>
        <Text>Home Page</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
