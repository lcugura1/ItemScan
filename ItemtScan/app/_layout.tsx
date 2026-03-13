import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import { colors } from "@/shared/constants/theme";
import { supabase } from "@/shared/libs/supabase";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";

export default function RootLayout() {
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.replace("/login");
      }
      if (event === "SIGNED_IN") {
        router.replace("/(tabs)");
      }
      if (event === "TOKEN_REFRESHED" && !session) {
        router.replace("/login");
      }
      if (event === "USER_UPDATED" && !session) {
        router.replace("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ErrorBoundary>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth/callback" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen
          name="forgot-password"
          options={{ headerShown: true, title: "Reset lozinke" }}
        />
      </Stack>
    </ErrorBoundary>
  );
}
