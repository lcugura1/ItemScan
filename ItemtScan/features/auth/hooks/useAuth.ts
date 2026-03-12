import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { authService } from "../services/auth.service";
import type { LoginCredentials, SignupCredentials } from "../types";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(async (fn: () => Promise<void>) => {
    setLoading(true);
    try {
      await fn();
    } catch (e: any) {
      Alert.alert("Greška", e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    (creds: LoginCredentials) => withLoading(() => authService.login(creds)),
    [withLoading],
  );

  const signup = useCallback(
    (creds: SignupCredentials) => withLoading(() => authService.signup(creds)),
    [withLoading],
  );

  const loginWithGoogle = useCallback(
    () => withLoading(() => authService.loginWithGoogle()),
    [withLoading],
  );

  const loginWithApple = useCallback(
    () => withLoading(() => authService.loginWithApple()),
    [withLoading],
  );

  const logout = useCallback(() => authService.logout(), []);

  return { loading, login, signup, loginWithGoogle, loginWithApple, logout };
}
