export type AuthProvider = "email" | "google" | "apple";

export interface Profile {
  id: string;
  email: string;
  display_name: string;
  full_name: string | null;
  avatar_url: string | null;
  auth_provider: AuthProvider;
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
  Pick<Profile, "full_name" | "avatar_url" | "locale" | "is_onboarded">
>;
