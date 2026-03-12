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
import { useSignupForm } from "../hooks/useSignupForm";
import { signupStyles as styles } from "./SignupScreen.styles";
import { AuthButton } from "./ui/AuthButton";
import { AuthFormField } from "./ui/AuthFormField";
import { PasswordStrengthMeter } from "./ui/PasswordStrengthMeter";

export default function SignupScreen() {
  const { control, errors, onSubmit, loading, password } = useSignupForm();
  const emailRef = useRef<TextInput>(null);
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
          <Text style={styles.logo}>📱 ItemScan</Text>
          <Text style={styles.subtitle}>Kreiraj račun</Text>

          <View style={styles.form}>
            <AuthFormField
              control={control}
              name="fullName"
              error={errors.fullName}
              placeholder="Ime i prezime"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
            />
            <AuthFormField
              ref={emailRef}
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

            <PasswordStrengthMeter password={password} />

            <AuthButton
              label={loading ? "Registracija..." : "Registriraj se"}
              loading={loading}
              onPress={onSubmit}
            />
            <AuthButton
              label="Već imam račun → Prijavi se"
              variant="secondary"
              onPress={() => router.push("/login")}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
