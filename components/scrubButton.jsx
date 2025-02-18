import { theme } from "@/theme";
import { StyleSheet, Text, Pressable, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import CustomText from "./CustomText";

export function ScrubButton({ title, onPress, color, width, className }) {
  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      className={`px-4 py-3 rounded w-${width ? width : "4/5"} ${className}`}
      style={{ backgroundColor: color || theme.colorGreen }}
    >
      {({ pressed }) => (
        <CustomText className={`text-white text-sm font-normal text-center `}>
          {title}
        </CustomText>
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
