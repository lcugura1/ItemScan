// LoginScreen.tsx
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, TextInput, View } from "react-native";

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  return (
    <View>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Lozinka" secureTextEntry />
      <Button title="Prijavi se" onPress={() => navigation.navigate("Home")} />
      <Button
        title="Registriraj se"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
}
