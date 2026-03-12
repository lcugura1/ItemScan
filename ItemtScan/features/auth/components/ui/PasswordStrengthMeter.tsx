import { colors } from "@/shared/constants/theme";
import { Text, View } from "react-native";
import { styles } from "./PasswordStrenghtMeter.styles";

const getStrength = (pw: string) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^a-zA-Z0-9]/.test(pw)) s++;

  const labels = ["", "Slaba", "Osrednja", "Jaka", "Odlična"];
  const clrs = [
    "#333",
    colors.textError,
    colors.textWarning,
    colors.accent,
    "#00e5a0",
  ];

  return { score: s, label: labels[s], color: clrs[s] };
};

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;
  const { score, label, color } = getStrength(password);

  return (
    <View style={styles.wrap}>
      <View style={styles.bars}>
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={[
              styles.bar,
              { backgroundColor: i <= score ? color : "#1a1a1a" },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}
