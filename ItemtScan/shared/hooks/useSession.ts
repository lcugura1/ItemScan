import { supabase } from "@/shared/libs/supabase";
import type { Session } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    const handleUrl = async (url: string) => {
      if (!url.includes("access_token")) return;
      const hashPart = url.includes("#")
        ? url.split("#")[1]
        : url.split("?")[1];
      const params = new URLSearchParams(hashPart ?? "");
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");
      if (access_token) {
        await supabase.auth.setSession({
          access_token,
          refresh_token: refresh_token ?? "",
        });
      }
    };

    Linking.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });
    const linkSub = Linking.addEventListener("url", ({ url }) =>
      handleUrl(url),
    );

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
    });

    return () => {
      linkSub.remove();
      subscription.unsubscribe();
    };
  }, []);

  return { session };
}
