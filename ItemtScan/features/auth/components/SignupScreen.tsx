import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import { SignupForm, signupSchema } from "../validation/auth.validation";
import { signupStyles as styles } from "./SignupScreen.styles";
import { AuthButton } from "./ui/AuthButton";
import { AuthInput } from "./ui/AuthInput";
import { PasswordStrengthMeter } from "./ui/PasswordStrengthMeter";

export default function SignupScreen() {
  const { loading, signup } = useAuth();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const password = watch("password") ?? "";

  const onSubmit = (data: SignupForm) => {
    signup({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    });
  };

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
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <AuthInput
                    placeholder="Ime i prezime"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => emailRef.current?.focus()}
                  />
                  {errors.fullName && (
                    <Text style={styles.error}>{errors.fullName.message}</Text>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <AuthInput
                    ref={emailRef}
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                  />
                  {errors.email && (
                    <Text style={styles.error}>{errors.email.message}</Text>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <AuthInput
                    ref={passwordRef}
                    placeholder="Lozinka"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                  {errors.password && (
                    <Text style={styles.error}>{errors.password.message}</Text>
                  )}
                </>
              )}
            />

            <PasswordStrengthMeter password={password} />

            <AuthButton
              label={loading ? "Registracija..." : "Registriraj se"}
              loading={loading}
              onPress={handleSubmit(onSubmit)}
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
