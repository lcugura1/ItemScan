import { colors, radius, spacing } from "@/shared/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Nešto je pošlo po krivu</Text>
          <Text style={styles.subtitle}>Došlo je do neočekivane greške.</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.setState({ hasError: false })}
          >
            <Text style={styles.btnText}>Pokušaj ponovno</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
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
