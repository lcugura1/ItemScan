import { authService } from "@/features/auth/services/auth.service";
import { HapticTab } from "@/shared/components/ui/haptic-tab";
import { Colors } from "@/shared/constants/theme";
import { useColorScheme } from "@/shared/hooks/use-color-scheme";
import { Tabs } from "expo-router";
import React from "react";
import { Button } from "react-native/Libraries/Components/Button";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: true,
          tabBarButton: HapticTab,
          headerRight: () => (
            <Button title="Odjava" onPress={() => authService.logout()} />
          ),
        }}
      ></Tabs>
    </Tabs>
  );
}
