import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function AuthInput({ style, ...props }: Props) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#666"
      autoCapitalize="none"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#fff",
    fontSize: 15,
    marginBottom: 12,
  },
});
