import React from "react";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Dobrodošli u SmartScan! 📱</Text>
      <Button title="Logout" onPress={() => {}} />
    </View>
  );
}
