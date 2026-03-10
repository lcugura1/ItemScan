import { supabase } from "@/shared/libs/supabase";
import { Session } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    // Hvataj OAuth deep link callback
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

    // Provjeri je li app otvorena kroz OAuth redirect
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });

    // Slušaj live URL promjene
    const linkSub = Linking.addEventListener("url", ({ url }) =>
      handleUrl(url),
    );

    // Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      linkSub.remove();
      subscription.unsubscribe();
    };
  }, []);

  if (session === undefined) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0f0f0f",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color="#4f9eff" />
      </View>
    );
  }

  return <Redirect href={session ? "/(tabs)" : "/login"} />;
}
