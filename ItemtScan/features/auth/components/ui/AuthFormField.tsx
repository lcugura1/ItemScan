import { forwardRef } from "react";
import type {
    Control,
    FieldError,
    FieldPath,
    FieldValues,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { Text, TextInput } from "react-native";
import type { AuthInputProps } from "./AuthInput";
import { AuthInput } from "./AuthInput";

interface AuthFormFieldProps<T extends FieldValues> extends Omit<
  AuthInputProps,
  "value" | "onChangeText" | "onBlur"
> {
  control: Control<T>;
  name: FieldPath<T>;
  error?: FieldError;
  errorStyle?: object;
}

export const AuthFormField = forwardRef<TextInput, AuthFormFieldProps<any>>(
  ({ control, name, error, errorStyle, ...inputProps }, ref) => (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <AuthInput
            ref={ref}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...inputProps}
          />
          {error && (
            <Text
              style={[
                {
                  color: "#EF4444",
                  fontSize: 12,
                  marginTop: -4,
                  marginBottom: 8,
                  paddingLeft: 4,
                },
                errorStyle,
              ]}
            >
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  ),
);

AuthFormField.displayName = "AuthFormField";
