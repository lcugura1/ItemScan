import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { authService } from "../services/auth.service";
import { authStyles as styles } from "../styles/auth.styles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await authService.login({ email, password });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📱 ItemScan</Text>
      <Text style={styles.subtitle}>Skeniraj. Usporedi. Uštedi.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Lozinka"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.buttonPrimary, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonPrimaryText}>
            {loading ? "Prijava..." : "Prijavi se"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.buttonSecondaryText}>
            Nemam račun → Registriraj se
          </Text>
        </TouchableOpacity>

        {/* --- Razdjelnik (Divider) --- */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 16,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "#333" }} />
          <Text style={{ color: "#999", marginHorizontal: 12, fontSize: 12 }}>
            ili nastavi s
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#333" }} />
        </View>

        {/* --- Social Login Gumbi --- */}
        <TouchableOpacity
          style={[styles.buttonSecondary, { marginBottom: 8 }]}
          onPress={() => authService.loginWithGoogle()}
        >
          <Text style={styles.buttonSecondaryText}>Nastavi s Googleom</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => authService.loginWithApple()}
        >
          <Text style={styles.buttonSecondaryText}>Nastavi s Appleom</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
