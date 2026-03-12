import { colors, radius, spacing } from "@/shared/constants/theme";
import { StyleSheet } from "react-native";

export const authInputStyles = StyleSheet.create({
  input: {
    backgroundColor: colors.bgInput,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    color: colors.textPrimary,
    fontSize: 15,
    marginBottom: spacing.md,
  },
});
