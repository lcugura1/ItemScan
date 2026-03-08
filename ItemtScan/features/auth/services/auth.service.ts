import { router } from "expo-router";
import { Alert } from "react-native";

export interface LoginCredentials {
  email: string;
  password: string;
}

const HC_USER = {
  email: "korisnik.com",
  password: "korisnik1",
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<boolean> => {
    const { email, password } = credentials;

    if (email === HC_USER.email && password === HC_USER.password) {
      router.replace("/(tabs)");
      return true;
    }

    Alert.alert("The email or password is incorrect. Please try again.");
    return false;
  },

  logout: () => {
    router.replace("/login");
  },
};
