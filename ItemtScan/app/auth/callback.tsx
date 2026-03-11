import { supabase } from "@/shared/libs/supabase";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AuthCallback() {
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Hvataj i SIGNED_IN i INITIAL_SESSION
      if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session) {
        subscription.unsubscribe();
        router.replace("/(tabs)");
      } else if (event === "INITIAL_SESSION" && !session) {
        subscription.unsubscribe();
        router.replace("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#4f9eff" />
    </View>
  );
}
