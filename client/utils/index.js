import { Platform } from "react-native";
import { io } from "socket.io-client";
export const BaseUrl =
  Platform.OS === "android"
    ? "http://192.168.31.183:3000/"
    : "http://localhost:3000";

export const socket = io.connect("http://192.168.31.183:5050/");
