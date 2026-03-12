import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { authService } from "../services/auth.service";
import type { LoginCredentials, SignupCredentials } from "../types";

type ErrorHandler = ((msg: string) => void) | undefined;

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(
    async (fn: () => Promise<void>, onError?: ErrorHandler) => {
      setLoading(true);
      try {
        await fn();
      } catch (e: any) {
        if (onError) onError(e.message);
        else Alert.alert("Greška", e.message);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const login = useCallback(
    (creds: LoginCredentials, onError?: ErrorHandler) =>
      withLoading(() => authService.login(creds), onError),
    [withLoading],
  );

  const signup = useCallback(
    (creds: SignupCredentials, onError?: ErrorHandler) =>
      withLoading(() => authService.signup(creds), onError),
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
