import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

interface Props {
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
}

export function Skeleton({ width, height, borderRadius = 8 }: Props) {
  const anim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [anim]);

  return (
    <Animated.View
      style={[
        styles.bone,
        {
          width,
          height,
          borderRadius,
          opacity: anim,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  bone: {
    backgroundColor: "#1a1a2e",
  },
});
