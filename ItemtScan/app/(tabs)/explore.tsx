import { Text, View } from "react-native";
import { exploreStyles } from "../../features/deals/components/ExploreScreen.styles";

export default function ExploreScreen() {
  return (
    <View style={exploreStyles.container}>
      <Text style={exploreStyles.title}>Explore</Text>
      <Text style={exploreStyles.subtitle}>
        Ovdje će biti povijest skeniranja
      </Text>
    </View>
  );
}
