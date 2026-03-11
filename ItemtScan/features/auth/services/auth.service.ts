import { supabase } from "@/shared/libs/supabase";
import { makeRedirectUri } from "expo-auth-session";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import type {
  LoginCredentials,
  Profile,
  ProfileUpdate,
  SignupCredentials,
} from "../types";

WebBrowser.maybeCompleteAuthSession();

const REDIRECT_URL = makeRedirectUri({
  native: "itemscan://auth/callback",
});

console.log("REDIRECT_URL:", REDIRECT_URL);

const signInWithProvider = async (
  provider: "google" | "apple",
): Promise<void> => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: REDIRECT_URL,
      skipBrowserRedirect: true,
      queryParams: { prompt: "select_account" },
    },
  });

  if (error) throw new Error(error.message);
  if (!data?.url) throw new Error("OAuth nije vratio URL");

  const browserResult = await WebBrowser.openAuthSessionAsync(
    data.url,
    REDIRECT_URL,
  );

  if (browserResult.type === "success" || browserResult.type === "dismiss") {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      router.replace("/(tabs)");
    }
  }
};

export const authService = {
  login: async ({ email, password }: LoginCredentials): Promise<void> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    router.replace("/(tabs)");
  },

  signup: async ({
    email,
    password,
    fullName,
  }: SignupCredentials): Promise<void> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) throw new Error(error.message);
    router.replace("/login");
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
        "id, email, display_name, full_name, avatar_url, auth_provider, email_confirmed, locale, last_sign_in_at, created_at, updated_at",
      )
      .eq("id", userId)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as Profile;
  },

  updateProfile: async (
    userId: string,
    updates: ProfileUpdate,
  ): Promise<Profile> => {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Profile;
  },
};
