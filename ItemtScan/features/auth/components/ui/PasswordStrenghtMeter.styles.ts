import { spacing } from "@/shared/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrap: {
    marginTop: -spacing.sm,
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  bars: {
    flexDirection: "row",
    gap: 4,
  },
  bar: {
    flex: 1,
    height: 3,
    borderRadius: 2,
  },
  label: {
    fontSize: 11,
    paddingLeft: 2,
  },
});
