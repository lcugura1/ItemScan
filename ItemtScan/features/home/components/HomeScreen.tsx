import { useProfile } from "@/features/auth/hooks/useProfile";
import { authService } from "@/features/auth/services/auth.service";
import { supabase } from "@/shared/libs/supabase";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
import { homeStyles as styles } from "../components/styles/home.styles";

export default function HomeScreen() {
  const [session, setSession] = useState<Session | null>(null);
  const { profile, loading: profileLoading } = useProfile();

  useEffect(() => {
    // Dohvati trenutnu sesiju pri učitavanju
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Prati promjene login/logout stanja
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) router.replace("/login");
    });

    return () => subscription.unsubscribe();
  }, []);

  if (profileLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>📱 ItemScan</Text>
        <Text style={styles.subtitle}>
          Pozdrav, {session?.user?.email?.split("@")[0]}!
        </Text>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Odjava"
            onPress={() => authService.logout()}
            color="#FF3B30"
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 ItemScan</Text>

      {/* Prikazujemo display_name iz profila (ili fallback na email) */}
      <Text style={styles.subtitle}>
        Pozdrav, {profile?.display_name || session?.user?.email?.split("@")[0]}!
      </Text>

      {/* Banner za potvrdu emaila ako nije potvrđen */}
      {!profile?.email_confirmed && (
        <View
          style={{
            backgroundColor: "#FFF3CD",
            padding: 10,
            borderRadius: 8,
            marginVertical: 10,
          }}
        >
          <Text style={{ color: "#856404", textAlign: "center" }}>
            ⚠️ Molimo potvrdi svoj email!
          </Text>
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <Button
          title="Odjava"
          onPress={() => authService.logout()}
          color="#FF3B30"
        />
      </View>
    </View>
  );
}
