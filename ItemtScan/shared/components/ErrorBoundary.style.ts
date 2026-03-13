import { colors, radius, spacing } from "@/shared/constants/theme";
import { StyleSheet } from "react-native";
export const ErrorBoundaryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    color: colors.textDim,
    fontSize: 14,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  btn: {
    backgroundColor: colors.bgCard,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  btnText: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: "600",
  },
});
