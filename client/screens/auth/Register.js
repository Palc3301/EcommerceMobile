import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import InputBox from "../../components/Form/InputBox";

const Register = ({ navigation }) => {
  const loginImage = "https://fishcopfed.coop/images/login.png";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async () => {
    try {
      if (!email || !password || !name || !address || !city || !phone) {
        return alert("Please provide all fields");
      }

      // Fazer solicitação de registro para o backend
      const response = await axios.post(
        "http://192.168.31.183:5000/api/v1/user/register",
        {
          name,
          email,
          password,
          address,
          city,
          phone,
          country: "country",
          answer: "answer",
        }
      );

      // Verificar se o registro foi bem-sucedido
      if (response.data.success) {
        alert("Registration Successful");
        navigation.navigate("login");
      } else {
        alert(`Registration Failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: loginImage }} style={styles.image} />

      <InputBox
        placeholder={"Enter Your Name"}
        value={name}
        setValue={setName}
        autoComplete={"name"}
      />
      <InputBox
        placeholder={"Enter Your Email"}
        value={email}
        setValue={setEmail}
        autoComplete={"email"}
      />
      <InputBox
        value={password}
        setValue={setPassword}
        placeholder={"Enter Your Password"}
        secureTextEntry={true}
      />
      <InputBox
        placeholder={"Enter Your Address"}
        value={address}
        setValue={setAddress}
        autoComplete={"address-line1"}
      />
      <InputBox
        placeholder={"Enter Your City"}
        value={city}
        setValue={setCity}
        autoComplete={"country"}
      />
      <InputBox
        placeholder={"Enter Your Contact No"}
        value={phone}
        setValue={setPhone}
        autoComplete={"tel"}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
          <Text style={styles.loginBtnText}>Register</Text>
        </TouchableOpacity>
        <Text>
          Already a user?{"  "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("login")}>
            Login!
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: "100%",
  },
  image: {
    height: 200,
    width: "100%",
    resizeMode: "contain",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "#000000",
    width: "80%",
    justifyContent: "center",
    height: 40,
    borderRadius: 10,
    marginVertical: 20,
  },
  loginBtnText: {
    color: "#ffffff",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: 18,
  },
  link: {
    color: "red",
  },
});

export default Register;
