import { colors, spacing } from "@/shared/constants/theme";
import { StyleSheet } from "react-native";

export const socialLoginGroupStyles = StyleSheet.create({
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.placeholder,
    marginHorizontal: spacing.md,
    fontSize: 12,
  },
});
