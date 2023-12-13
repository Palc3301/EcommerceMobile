import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Layout from "../../components/Layout/Layout";
import InputBox from "../../components/Form/InputBox";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const loadProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        console.log("Token not present. Redirecting to login.");
        // Adicione aqui a navegação ou redirecionamento para a tela de login no React Native
        return;
      }
      const tokenId =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4OGI3ZjIwZmM4MzMwNmM2OWQ0ZTAiLCJpYXQiOjE3MDI0NjY0NzYsImV4cCI6MTcwMzA3MTI3Nn0.Ny67CMVTZ0G0cJOPigyLPnQenpobvv1kdXYvHDBoEP0";
      const response = await axios.get(
        "http://192.168.31.183:5000/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { name, email, address, city, country, phone } = response.data.user;
      setName(name);
      setEmail(email);
      setAddress(address);
      setCity(city);
      setCountry(country);
      setPhone(phone);
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  const handleUpdate = async () => {
    try {
      if (!email || !name || !address || !city || !country || !phone) {
        return alert("Please provide all fields");
      }

      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);

      const response = await axios.put(
        "http://192.168.31.183:5000/api/v1/user/profile-update",
        {
          name,
          email,
          address,
          city,
          country,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response && response.data) {
        if (response.data.success) {
          alert("Profile Updated Successfully");
        } else {
          alert(`Profile Update Failed: ${response.data.message}`);
        }
      } else {
        console.error("Profile update failed: Invalid response format");
        alert("Profile update failed. Please try again.");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("Profile update failed. Please try again.");
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <ScrollView>
          <InputBox
            value={name}
            setValue={setName}
            placeholder={"Enter your name"}
            autoComplete={"name"}
          />
          <InputBox
            value={email}
            setValue={setEmail}
            placeholder={"Enter your email"}
            autoComplete={"email"}
          />
          <InputBox
            value={address}
            setValue={setAddress}
            placeholder={"Enter your address"}
            autoComplete={"address-line1"}
          />
          <InputBox
            value={city}
            setValue={setCity}
            placeholder={"Enter your city"}
            autoComplete={"country"}
          />
          <InputBox
            value={country}
            setValue={setCountry}
            placeholder={"Enter your country"}
            autoComplete={"country"}
          />
          <InputBox
            value={phone}
            setValue={setPhone}
            placeholder={"Enter your contact no"}
            autoComplete={"tel"}
          />

          <TouchableOpacity style={styles.btnUpdate} onPress={handleUpdate}>
            <Text style={styles.btnUpdateText}>UPDATE PROFILE</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  btnUpdate: {
    backgroundColor: "#000000",
    height: 40,
    borderRadius: 20,
    marginHorizontal: 30,
    justifyContent: "center",
    marginTop: 10,
  },
  btnUpdateText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Profile;
