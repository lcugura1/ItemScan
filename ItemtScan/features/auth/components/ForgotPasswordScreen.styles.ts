import { colors, spacing } from "@/shared/constants/theme";
import { StyleSheet } from "react-native";

export const forgotPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    padding: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textDim,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  error: {
    color: colors.textError,
    fontSize: 12,
    marginTop: -spacing.sm,
    marginBottom: spacing.sm,
    paddingLeft: 4,
  },
  successText: {
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
});
