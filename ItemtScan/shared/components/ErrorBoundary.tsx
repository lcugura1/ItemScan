import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ErrorBoundaryStyles as styles } from "./ErrorBoundary.style";

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
