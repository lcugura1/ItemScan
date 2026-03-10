import { useState } from "react";
import { authService } from "../services/auth.service";
import type { LoginCredentials, SignupCredentials } from "../types";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const withLoading = async (fn: () => Promise<boolean>) => {
    setLoading(true);
    try {
      return await fn();
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
