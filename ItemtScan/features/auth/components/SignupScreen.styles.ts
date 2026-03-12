import { colors, spacing } from "@/shared/constants/theme";
import { StyleSheet } from "react-native";

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    padding: spacing.xl,
  },
  logo: {
    fontSize: 36,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textDim,
    textAlign: "center",
    marginBottom: spacing.xxl,
    fontSize: 14,
  },
  form: {
    gap: 0,
  },
  error: {
    color: colors.textError,
    fontSize: 12,
    marginTop: -spacing.sm,
    marginBottom: spacing.sm,
    paddingLeft: 4,
  },
});
