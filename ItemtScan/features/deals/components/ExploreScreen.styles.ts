import { colors, spacing } from "@/shared/constants/theme";
import { StyleSheet } from "react-native";

export const exploreStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: { fontSize: 14, color: colors.textDim },
});
