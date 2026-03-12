import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginForm, loginSchema } from "../validation/auth.validation";
import { useAuth } from "./useAuth";

export function useLoginForm() {
  const { login, loading } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = form.handleSubmit((data) =>
    login({ email: data.email, password: data.password }, (msg) =>
      setServerError(msg),
    ),
  );

  return {
    control: form.control,
    errors: form.formState.errors,
    onSubmit,
    loading,
    serverError,
  };
}
