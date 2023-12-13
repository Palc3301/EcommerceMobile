import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import InputBox from "../../components/Form/InputBox";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importe o AsyncStorage

// Redux hooks
import { login } from "../../redux/features/auth/userActions";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ navigation }) => {
  const loginImage = "https://fishcopfed.coop/images/login.png";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux dispatch
  const dispatch = useDispatch();

  // Global state
  const { loading, error, message } = useSelector((state) => state.user);

  // Login function
  const handleLogin = async () => {
    try {
      console.log("Logging in with email:", email);
      console.log("Logging in with password:", password);

      if (!email || !password) {
        return Alert.alert("Please add email or password");
      }

      const response = await axios.post(
        "http://192.168.31.183:5000/api/v1/user/login",
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);

      if (response.data.success) {
        await AsyncStorage.setItem("token", response.data.token);
        dispatch(login(response.data.token, response.data.user));
        navigation.navigate("home");
      } else {
        Alert.alert(`Login Failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      Alert.alert(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: loginImage }} style={styles.image} />

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
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
        <Text>
          Not a user yet? Please{"  "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("register")}>
            Register!
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

export default Login;
