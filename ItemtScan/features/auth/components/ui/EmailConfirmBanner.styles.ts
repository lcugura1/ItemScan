import { colors, radius, spacing } from "@/shared/constants/theme";
import { StyleSheet } from "react-native";

export const emailConfirmBannerStyles = StyleSheet.create({
  banner: {
    backgroundColor: colors.bgBanner,
    borderRadius: radius.sm,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  text: {
    color: colors.textWarning,
    textAlign: "center",
    fontSize: 13,
  },
});
