import { router } from "expo-router";
import { Button, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Button title="Prijavi se" onPress={() => router.replace("/(tabs)")} />
      <Button title="Registriraj se" onPress={() => router.push("/signup")} />
    </View>
  );
}
