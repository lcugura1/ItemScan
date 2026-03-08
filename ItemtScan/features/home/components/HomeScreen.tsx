import { authService } from "@/features/auth/services/auth.service"; // tvoj path
import { supabase } from "@/shared/libs/supabase";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { homeStyles as styles } from "../components/styles/home.styles";

export default function HomeScreen() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) router.replace("/login");
    });

    return () => subscription.unsubscribe(); // cleanup
  }, []);
  const displayName =
    session?.user?.user_metadata?.full_name ||
    session?.user?.email?.split("@")[0] ||
    "Korisnik";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 ItemScan</Text>
      <Text style={styles.subtitle}>Pozdrav, {displayName}!</Text>
      <Button title="Odjava" onPress={() => authService.logout()} />
    </View>
  );
}
