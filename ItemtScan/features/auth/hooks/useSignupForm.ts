import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupForm, signupSchema } from "../validation/auth.validation";
import { useAuth } from "./useAuth";

export function useSignupForm() {
  const { signup, loading } = useAuth();

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = form.handleSubmit((data) =>
    signup({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    }),
  );

  return {
    control: form.control,
    errors: form.formState.errors,
    password: form.watch("password") ?? "",
    onSubmit,
    loading,
  };
}
