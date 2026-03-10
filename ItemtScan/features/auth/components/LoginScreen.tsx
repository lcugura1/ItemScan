import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { AuthButton } from "./ui/AuthButton";
import { AuthInput } from "./ui/AuthInput";
import { SocialLoginGroup } from "./ui/SocialLoginGroup";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login, loginWithGoogle, loginWithApple } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📱 ItemScan</Text>
      <Text style={styles.subtitle}>Skeniraj. Usporedi. Uštedi.</Text>

      <View style={styles.form}>
        <AuthInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <AuthInput
          placeholder="Lozinka"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <AuthButton
          label={loading ? "Prijava..." : "Prijavi se"}
          loading={loading}
          onPress={() => login({ email, password })}
        />

        <AuthButton
          label="Nemam račun → Registriraj se"
          variant="secondary"
          onPress={() => router.push("/signup")}
        />

        <SocialLoginGroup
          loading={loading}
          onGoogle={loginWithGoogle}
          onApple={loginWithApple}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    justifyContent: "center",
    padding: 24,
  },
  logo: { fontSize: 32, textAlign: "center", marginBottom: 8 },
  subtitle: {
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    fontSize: 14,
  },
  form: { gap: 0 },
});
