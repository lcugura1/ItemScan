import { colors } from "@/shared/constants/theme";
import * as Haptics from "expo-haptics";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { authButtonStyles as styles } from "./AuthButton.styles";

interface Props extends TouchableOpacityProps {
  label: string;
  loading?: boolean;
  variant?: "primary" | "secondary";
}

export function AuthButton({
  label,
  loading = false,
  variant = "primary",
  style,
  onPress,
  ...props
}: Props) {
  const handlePress: typeof onPress = (e) => {
    // Haptic ne treba await — fire and forget
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(e);
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === "primary" ? styles.primary : styles.secondary,
        loading && styles.disabled,
        style,
      ]}
      disabled={loading}
      onPress={handlePress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? colors.textPrimary : colors.accent}
        />
      ) : (
        <Text
          style={
            variant === "primary" ? styles.labelPrimary : styles.labelSecondary
          }
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
