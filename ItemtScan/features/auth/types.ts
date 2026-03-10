// features/auth/types.ts;
export type AuthProvider = "email" | "google" | "apple";
export interface Profile {
  id: string;
  email: string;
  display_name: string; // generated column, nikad null
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  auth_provider: AuthProvider;
  provider_id: string | null;
  email_confirmed: boolean;
  is_onboarded: boolean;
  locale: string;
  last_sign_in_at: string | null;
  created_at: string;
  updated_at: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}
export interface SignupCredentials {
  email: string;
  password: string;
  fullName: string;
}
export type ProfileUpdate = Partial<
  Pick<
    Profile,
    "full_name" | "avatar_url" | "phone" | "locale" | "is_onboarded"
  >
>;
