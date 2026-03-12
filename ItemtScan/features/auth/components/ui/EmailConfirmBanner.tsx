import { Text, View } from "react-native";
import { emailConfirmBannerStyles as styles } from "./EmailConfirmBanner.styles";

interface Props {
  visible: boolean;
}

export function EmailConfirmBanner({ visible }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>⚠️ Molimo potvrdi svoj email!</Text>
    </View>
  );
}
