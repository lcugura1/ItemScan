import { StyleSheet, Text, View } from "react-native";
import { AuthButton } from "./AuthButton";

interface Props {
  loading: boolean;
  onGoogle: () => void;
  onApple: () => void;
}

export function SocialLoginGroup({ loading, onGoogle, onApple }: Props) {
  return (
    <>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>ili nastavi s</Text>
        <View style={styles.line} />
      </View>
      <AuthButton
        label="Nastavi s Googleom"
        variant="secondary"
        loading={loading}
        onPress={onGoogle}
      />
      <AuthButton
        label="Nastavi s Appleom"
        variant="secondary"
        loading={loading}
        onPress={onApple}
      />
    </>
  );
}

const styles = StyleSheet.create({
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 16 },
  line: { flex: 1, height: 1, backgroundColor: "#333" },
  dividerText: { color: "#666", marginHorizontal: 12, fontSize: 12 },
});
