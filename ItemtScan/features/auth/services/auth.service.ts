import { supabase } from "@/shared/libs/supabase";
import { makeRedirectUri } from "expo-auth-session";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Alert } from "react-native";
import type {
  LoginCredentials,
  Profile,
  ProfileUpdate,
  SignupCredentials,
} from "../types";
// Ovo automatski detektira ispravan URL za emulator i fizički mobitel
WebBrowser.maybeCompleteAuthSession();
const REDIRECT_URL = makeRedirectUri({
  scheme: "itemscan",
  path: "auth/callback",
});

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
      options: { data: { full_name: credentials.fullName } },
    });
    if (error) {
      Alert.alert("Greška", error.message);
      return false;
    }
    router.replace("/login");
    return true;
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (e: any) {
    } finally {
      router.replace("/login");
    }
  },

  loginWithGoogle: async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: REDIRECT_URL, skipBrowserRedirect: true },
      });

      if (error) {
        Alert.alert("Google greška", error.message);
        return false;
      }

      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          REDIRECT_URL,
        );

        Alert.alert(
          "Result",
          JSON.stringify({
            type: result.type,
            url: "url" in result ? result.url?.substring(0, 80) : "none",
          }),
        );

        if (result.type === "success" && result.url) {
          const hashPart = result.url.includes("#")
            ? result.url.split("#")[1]
            : result.url.split("?")[1];

          const params = new URLSearchParams(hashPart ?? "");
          const access_token = params.get("access_token");
          const refresh_token = params.get("refresh_token");

          if (access_token) {
            await supabase.auth.setSession({
              access_token,
              refresh_token: refresh_token ?? "",
            });
            router.replace("/(tabs)");
            return true;
          }
        }
      }
      return false;
    } catch (e: any) {
      Alert.alert("Greška", e.message);
      return false;
    }
  },

  loginWithApple: async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: { redirectTo: REDIRECT_URL, skipBrowserRedirect: true },
      });

      if (error) {
        Alert.alert("Apple greška", error.message);
        return false;
      }

      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          REDIRECT_URL,
        );

        if (result.type === "success" && result.url) {
          const hashPart = result.url.includes("#")
            ? result.url.split("#")[1]
            : result.url.split("?")[1];

          const params = new URLSearchParams(hashPart ?? "");
          const access_token = params.get("access_token");
          const refresh_token = params.get("refresh_token");

          if (access_token) {
            await supabase.auth.setSession({
              access_token,
              refresh_token: refresh_token ?? "",
            });
            router.replace("/(tabs)");
            return true;
          }
        }
      }
      return false;
    } catch (e: any) {
      Alert.alert("Apple greška", e.message);
      return false;
    }
  },

  getProfile: async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        id, email, display_name, full_name, avatar_url, phone,
        auth_provider, email_confirmed, is_onboarded, locale, last_sign_in_at,
        created_at, updated_at
      `,
      )
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("getProfile:", error.message);
      return null;
    }
    return data as Profile;
  },

  updateProfile: async (
    userId: string,
    updates: ProfileUpdate,
  ): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();
    if (error) {
      console.error("updateProfile:", error.message);
      return null;
    }
    return data as Profile;
  },
};
