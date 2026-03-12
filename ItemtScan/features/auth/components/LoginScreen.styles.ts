import { colors, spacing } from "@/shared/constants/theme";
import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    padding: spacing.xl,
  },
  logoWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  subtitle: {
    color: colors.textDim,
    textAlign: "center",
    marginBottom: spacing.xl,
    fontSize: 14,
  },
  form: {
    gap: 0,
    width: "100%",
  },
  error: {
    color: colors.textError,
    fontSize: 12,
    marginTop: -spacing.sm,
    marginBottom: spacing.sm,
    paddingLeft: 4,
  },
});
