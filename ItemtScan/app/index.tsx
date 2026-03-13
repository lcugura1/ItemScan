import { useSession } from "@/shared/hooks/useSession";
import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";
import { useRef, useState } from "react";
import { View } from "react-native";
import { styles } from "./index.styles";

// Zadrži native splash dok mi ne kažemo da ga sakrije
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const { session } = useSession();
  const [animationDone, setAnimationDone] = useState(false);
  const lottieRef = useRef<LottieView>(null);

  if (session === undefined || !animationDone) {
    return (
      <View
        style={styles.container}
        onLayout={() => {
          // React je renderirao View — sad sakrij native splash
          // Lottie preuzima bez ikakvog prijelaza
          SplashScreen.hideAsync();
        }}
      >
        <LottieView
          ref={lottieRef}
          source={require("../assets/animations/splash.json")}
          autoPlay
          loop={false}
          speed={0.5}
          style={styles.animation}
          onAnimationFinish={() => setAnimationDone(true)}
          resizeMode="cover"
        />
      </View>
    );
  }

  return <Redirect href={session ? "/(tabs)" : "/login"} />;
}
