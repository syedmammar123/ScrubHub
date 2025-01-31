import { theme } from "@/theme";
import { StyleSheet, Text, Pressable, Platform } from "react-native";
import * as Haptics from "expo-haptics";;

export function ScrubButton({ title, onPress, color, width }) {
  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  console.log(theme.colorGreen);

  return (
    <Pressable
      onPress={handlePress}
      className={`px-4 py-3 rounded w-${
        width ? width : "4/5"
      }`}
      style={{ backgroundColor: color || theme.colorGreen }}
    >
      {({ pressed }) => (
        <Text
          className={`text-white text-sm font-normal text-center `}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
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
