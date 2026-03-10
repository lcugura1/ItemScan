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

WebBrowser.maybeCompleteAuthSession();

const REDIRECT_URL = makeRedirectUri({
  scheme: "itemscan",
  path: "auth/callback",
});

const handleOAuthResult = async (url: string): Promise<boolean> => {
  const hashPart = url.includes("#") ? url.split("#")[1] : url.split("?")[1];
  const params = new URLSearchParams(hashPart ?? "");
  const access_token = params.get("access_token");
  const refresh_token = params.get("refresh_token");

  if (!access_token) return false;

  await supabase.auth.setSession({
    access_token,
    refresh_token: refresh_token ?? "",
  });
  router.replace("/(tabs)");
  return true;
};

const signInWithProvider = async (
  provider: "google" | "apple",
): Promise<boolean> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: REDIRECT_URL,
        skipBrowserRedirect: true,
        queryParams: { prompt: "select_account" },
      },
    });

    if (error) {
      Alert.alert("Greška", error.message);
      return false;
    }
    if (!data?.url) return false;

    const result = await WebBrowser.openAuthSessionAsync(
      data.url,
      REDIRECT_URL,
    );
    if (result.type === "success" && result.url) {
      return handleOAuthResult(result.url);
    }
    return false;
  } catch (e: any) {
    Alert.alert("Greška", e.message);
    return false;
  }
};

export const authService = {
  login: async ({ email, password }: LoginCredentials): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert("Greška", error.message);
      return false;
    }
    router.replace("/(tabs)");
    return true;
  },

  signup: async ({
    email,
    password,
    fullName,
  }: SignupCredentials): Promise<boolean> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) {
      Alert.alert("Greška", error.message);
      return false;
    }
    router.replace("/login");
    return true;
  },

  logout: async (): Promise<void> => {
    await supabase.auth.signOut();
    router.replace("/login");
  },

  loginWithGoogle: () => signInWithProvider("google"),
  loginWithApple: () => signInWithProvider("apple"),

  getProfile: async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "id, email, display_name, full_name, avatar_url, auth_provider, email_confirmed, is_onboarded, locale, last_sign_in_at, created_at, updated_at",
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
