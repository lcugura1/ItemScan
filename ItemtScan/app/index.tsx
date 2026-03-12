import { colors } from "@/shared/constants/theme";
import { useSession } from "@/shared/hooks/useSession";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./index.styles";

export default function Index() {
  const { session } = useSession();

  if (session === undefined) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return <Redirect href={session ? "/(tabs)" : "/login"} />;
}
