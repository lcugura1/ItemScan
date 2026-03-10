import { useProfile } from "@/features/auth/hooks/useProfile";
import { authService } from "@/features/auth/services/auth.service";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4f9eff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📱 ItemScan</Text>
      <Text style={styles.welcome}>
        Pozdrav, {profile?.display_name ?? ""}!
      </Text>

      {profile && !profile.email_confirmed && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>⚠️ Molimo potvrdi svoj email!</Text>
        </View>
      )}

      <TouchableOpacity style={styles.logoutBtn} onPress={authService.logout}>
        <Text style={styles.logoutText}>Odjava</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0f0f",
  },
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    padding: 24,
    paddingTop: 60,
  },
  logo: { fontSize: 28, marginBottom: 8 },
  welcome: { color: "#fff", fontSize: 22, fontWeight: "600", marginBottom: 20 },
  banner: {
    backgroundColor: "#2a1f00",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  bannerText: { color: "#F59E0B", textAlign: "center", fontSize: 13 },
  logoutBtn: {
    marginTop: "auto",
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
  },
  logoutText: { color: "#EF4444", fontWeight: "600" },
});
