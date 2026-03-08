import { supabase } from "@/shared/libs/supabase";
import { router } from "expo-router";
import { Alert } from "react-native";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  fullName: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      Alert.alert("Greška", error.message);
      return false;
    }

    router.replace("/(tabs)");
    return true;
  },

  signup: async (credentials: SignupCredentials): Promise<boolean> => {
    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: { full_name: credentials.fullName },
      },
    });

    if (error) {
      Alert.alert("Greška", error.message);
      return false;
    }

    router.replace("/login");
    return true;
  },

  logout: async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  },
};
