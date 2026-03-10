import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";

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
  ...props
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === "primary" ? styles.primary : styles.secondary,
        loading && styles.disabled,
        style,
      ]}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : "#4f9eff"} />
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

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  primary: { backgroundColor: "#4f9eff" },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#333",
  },
  disabled: { opacity: 0.6 },
  labelPrimary: { color: "#fff", fontSize: 15, fontWeight: "600" },
  labelSecondary: { color: "#aaa", fontSize: 15 },
});
