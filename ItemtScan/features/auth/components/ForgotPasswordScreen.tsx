import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import { z } from "zod";
import { authService } from "../services/auth.service";
import { forgotPasswordStyles as styles } from "./ForgotPasswordScreen.styles";
import { AuthButton } from "./ui/AuthButton";
import { AuthInput } from "./ui/AuthInput";

const schema = z.object({
  email: z.string().min(1, "Email je obavezan").email("Nevaljana email adresa"),
});
type FormData = z.infer<typeof schema>;

export default function ForgotPasswordScreen() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await authService.resetPassword(data.email);
      setSent(true);
    } catch (e: any) {
      // greška je handled u authService — bacamo Alert iz useAuth
      // ovdje samo resetiramo loading
    } finally {
      setLoading(false);
    }
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
          <Text style={styles.title}>Resetiraj lozinku</Text>

          {sent ? (
            // ── Stanje nakon slanja ──
            <>
              <Text style={styles.successText}>
                ✅ Provjerite email — poslali smo vam link za reset lozinke.
              </Text>
              <AuthButton
                label="Natrag na prijavu"
                variant="secondary"
                onPress={() => router.replace("/login")}
              />
            </>
          ) : (
            // ── Forma ──
            <>
              <Text style={styles.subtitle}>
                Unesite email i poslat ćemo vam link za reset.
              </Text>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <AuthInput
                      placeholder="Email"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                    {errors.email && (
                      <Text style={styles.error}>{errors.email.message}</Text>
                    )}
                  </>
                )}
              />

              <AuthButton
                label={loading ? "Slanje..." : "Pošalji link"}
                loading={loading}
                onPress={handleSubmit(onSubmit)}
              />

              <AuthButton
                label="← Natrag na prijavu"
                variant="secondary"
                onPress={() => router.back()}
              />
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
