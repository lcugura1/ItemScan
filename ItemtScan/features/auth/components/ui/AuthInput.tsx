import { colors } from "@/shared/constants/theme";
import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { authInputStyles as styles } from "./AuthInput.styles";

export interface AuthInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const AuthInput = forwardRef<TextInput, AuthInputProps>(
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
