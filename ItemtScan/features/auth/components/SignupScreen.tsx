import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { authService } from "../services/auth.service";
import { authStyles as styles } from "../styles/auth.styles";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Greška", "Popuni sva polja");
      return;
    }
    setLoading(true);
    await authService.signup({ email, password, fullName: name });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📱 ItemScan</Text>
      <Text style={styles.subtitle}>Kreiraj račun</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Ime i prezime"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
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
          style={styles.buttonPrimary}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.buttonPrimaryText}>Registriraj se</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonSecondaryText}>
            Već imam račun → Prijavi se
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
