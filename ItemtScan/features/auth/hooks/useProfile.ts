import { supabase } from "@/shared/libs/supabase";
import { useEffect, useState } from "react";
import { authService } from "../services/auth.service";
import type { Profile, ProfileUpdate } from "../types";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async (userId: string) => {
      setLoading(true);
      setError(null);
      const data = await authService.getProfile(userId);
      if (!mounted) return;
      if (data) setProfile(data);
      else setError("Profil nije pronađen");
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        if (session?.user) fetchProfile(session.user.id);
        else {
          setProfile(null);
          setLoading(false);
        }
      },
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const updateProfile = async (updates: ProfileUpdate) => {
    if (!profile) return null;
    const updated = await authService.updateProfile(profile.id, updates);
    if (updated) setProfile(updated);
    return updated;
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
}
