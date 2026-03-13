import { formPersist } from "@/shared/utils/formPersist";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginForm, loginSchema } from "../validation/auth.validation";
import { useAuth } from "./useAuth";

const PERSIST_KEY = "login_form";

export function useLoginForm() {
  const { login, loading } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  // Učitaj spašeni email pri mountu
  useEffect(() => {
    formPersist.load<LoginForm>(PERSIST_KEY).then((saved) => {
      if (saved.email) form.setValue("email", saved.email);
    });
  }, []);

  // Spremi email na svaki onChange (ne lozinku — sigurnost!)
  useEffect(() => {
    const sub = form.watch((values) => {
      if (values.email) formPersist.save(PERSIST_KEY, { email: values.email });
    });
    return () => sub.unsubscribe();
  }, [form]);

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
