// features/auth/components/LoginScreen.tsx
import { router } from "expo-router";
import { useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Logo from "../../../assets/logo ItemScan.svg";
import { useAuth } from "../hooks/useAuth";
import { useLoginForm } from "../hooks/useLoginForm";
import { loginStyles as styles } from "./LoginScreen.styles";
import { AuthButton } from "./ui/AuthButton";
import { AuthFormField } from "./ui/AuthFormField";
import { SocialLoginGroup } from "./ui/SocialLoginGroup";

export default function LoginScreen() {
  const { control, errors, onSubmit, loading, serverError } = useLoginForm();
  const { loginWithGoogle, loginWithApple } = useAuth();
  const passwordRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.logoWrapper}>
            <Logo width={200} height={200} />
            <Text style={styles.subtitle}>Skeniraj. Usporedi. Uštedi.</Text>
          </View>

          <View style={styles.form}>
            <AuthFormField
              control={control}
              name="email"
              error={errors.email}
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <AuthFormField
              ref={passwordRef}
              control={control}
              name="password"
              error={errors.password}
              placeholder="Lozinka"
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={onSubmit}
            />

            {serverError && <Text style={styles.error}>{serverError}</Text>}

            <AuthButton
              label={loading ? "Prijava..." : "Prijavi se"}
              loading={loading}
              onPress={onSubmit}
            />
            <AuthButton
              label="Nemam račun → Registriraj se"
              variant="secondary"
              onPress={() => router.push("/signup")}
            />
            <AuthButton
              label="Zaboravio sam lozinku"
              variant="secondary"
              onPress={() => router.push("/forgot-password")}
            />
            <SocialLoginGroup
              loading={loading}
              providers={[
                {
                  key: "google",
                  label: "Nastavi s Googleom",
                  onPress: loginWithGoogle,
                },
                {
                  key: "apple",
                  label: "Nastavi s Appleom",
                  onPress: loginWithApple,
                },
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
