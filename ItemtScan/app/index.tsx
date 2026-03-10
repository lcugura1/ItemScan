import { useSession } from "@/shared/hooks/useSession";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { session } = useSession();

  if (session === undefined) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0f0f0f",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color="#4f9eff" />
      </View>
    );
  }

  return <Redirect href={session ? "/(tabs)" : "/login"} />;
}
