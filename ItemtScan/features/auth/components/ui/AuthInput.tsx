import { colors } from "@/shared/constants/theme";
import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { authInputStyles as styles } from "./AuthInput.styles";

interface Props extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const AuthInput = forwardRef<TextInput, Props>(
  ({ style, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={[styles.input, style]}
        placeholderTextColor={colors.placeholder}
        autoCapitalize="none"
        {...props}
      />
    );
  },
);

AuthInput.displayName = "AuthInput";
