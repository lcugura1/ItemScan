import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  onSignup: (name: string, email: string, password: string) => void;
  onNavigateLogin: () => void;
};

export default function SignupForm({ onSignup, onNavigateLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <View>
      <TextInput
        placeholder="Ime"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Lozinka"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button
        title="Registriraj se"
        onPress={() => onSignup(name, email, password)}
      />
      <Text style={styles.link} onPress={onNavigateLogin}>
        Već imaš račun? Prijavi se
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  link: { marginTop: 16, textAlign: "center", color: "#007AFF" },
});
