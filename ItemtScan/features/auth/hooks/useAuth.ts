import { useState } from "react";
import { Alert } from "react-native";
import { authService } from "../services/auth.service";
import type { LoginCredentials, SignupCredentials } from "../types";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const withLoading = async (fn: () => Promise<void>) => {
    setLoading(true);
    try {
      await fn();
    } catch (e: any) {
      Alert.alert("Greška", e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login: (creds: LoginCredentials) =>
      withLoading(() => authService.login(creds)),
    signup: (creds: SignupCredentials) =>
      withLoading(() => authService.signup(creds)),
    loginWithGoogle: () => withLoading(() => authService.loginWithGoogle()),
    loginWithApple: () => withLoading(() => authService.loginWithApple()),
    logout: () => authService.logout(),
  };
}
