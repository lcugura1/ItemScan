import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import Logo from "../../../assets/logo ItemScan.svg";
import { useAuth } from "../hooks/useAuth";
import { authStyles as styles } from "../styles/auth.styles";
import { AuthButton } from "./ui/AuthButton";
import { AuthInput } from "./ui/AuthInput";
import { SocialLoginGroup } from "./ui/SocialLoginGroup";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login, loginWithGoogle, loginWithApple } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo width={200} height={200} />
        <Text style={styles.subtitle}>Skeniraj. Usporedi. Uštedi.</Text>
      </View>

      <View style={[styles.form, { width: "100%" }]}>
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
