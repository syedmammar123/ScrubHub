import { theme } from "@/theme";
import { StyleSheet, Text, Pressable, Platform } from "react-native";
import * as Haptics from "expo-haptics";

export function ScrubButton({ title, onPress, color, width }) {
  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={(state) => [
        styles.button,
        { backgroundColor: color || theme.colorGreen, width: width || "80%" },
        state.pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 4,
  },
  buttonPressed: {
    backgroundColor: theme.colorGray,
  },
});
