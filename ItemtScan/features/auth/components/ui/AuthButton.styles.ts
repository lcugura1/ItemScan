import { colors, radius } from "@/shared/constants/theme";
import { StyleSheet } from "react-native";

export const authButtonStyles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  primary: {
    backgroundColor: colors.accent,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.6,
  },
  labelPrimary: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
  labelSecondary: {
    color: colors.textSecondary,
    fontSize: 15,
  },
});
