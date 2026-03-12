import { EmailConfirmBanner } from "@/features/auth/components/ui/EmailConfirmBanner";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { authService } from "@/features/auth/services/auth.service";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { Text, TouchableOpacity, View } from "react-native";
import { homeStyles as styles } from "./HomeScreen.styles";

export default function HomeScreen() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <View style={styles.container}>
        <Skeleton width="40%" height={28} borderRadius={6} />
        <View style={{ height: 12 }} />
        <Skeleton width="60%" height={22} borderRadius={6} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📱 ItemScan</Text>
      <Text style={styles.welcome}>
        Pozdrav, {profile?.display_name ?? ""}!
      </Text>

      <EmailConfirmBanner visible={!!profile && !profile.email_confirmed} />

      <TouchableOpacity style={styles.logoutBtn} onPress={authService.logout}>
        <Text style={styles.logoutText}>Odjava</Text>
      </TouchableOpacity>
    </View>
  );
}
