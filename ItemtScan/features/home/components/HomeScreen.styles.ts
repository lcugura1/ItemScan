import { colors, radius, spacing } from "@/shared/constants/theme";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.xl,
    paddingTop: 60,
  },
  logo: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  welcome: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "600",
    marginBottom: spacing.xl,
  },
  banner: {
    backgroundColor: colors.bgBanner,
    borderRadius: radius.sm,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  bannerText: {
    color: colors.textWarning,
    textAlign: "center",
    fontSize: 13,
  },
  logoutBtn: {
    marginTop: "auto",
    backgroundColor: colors.bgCard,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: "center",
  },
  logoutText: {
    color: colors.textError,
    fontWeight: "600",
  },
});
