import { supabase } from "@/shared/libs/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { homeStyles as styles } from "../components/styles/home.styles";

export default function HomeScreen() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  const displayName =
    session?.user?.user_metadata?.full_name ||
    session?.user?.email?.split("@")[0] ||
    "Korisnik";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 ItemScan</Text>
      <Text style={styles.subtitle}>Pozdrav, {displayName}!</Text>
    </View>
  );
}
