import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const webStorage = {
  getItem: async (key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: async (key: string, value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  },
  removeItem: async (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },
};

export default Platform.OS === "web" ? webStorage : AsyncStorage;
