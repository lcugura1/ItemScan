import { Text, View } from "react-native";
import { AuthButton } from "./AuthButton";
import { socialLoginGroupStyles as styles } from "./SocialLoginGroup.styles";

interface SocialProvider {
  key: string;
  label: string;
  onPress: () => void;
}

interface Props {
  loading: boolean;
  providers: SocialProvider[];
}

export function SocialLoginGroup({ loading, providers }: Props) {
  return (
    <>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>ili nastavi s</Text>
        <View style={styles.line} />
      </View>

      {providers.map((provider) => (
        <AuthButton
          key={provider.key}
          label={provider.label}
          variant="secondary"
          loading={loading}
          onPress={provider.onPress}
        />
      ))}
    </>
  );
}
