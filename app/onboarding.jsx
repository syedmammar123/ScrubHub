import { ScrubButton } from "@/components/scrubButton";
import { ScrubImage } from "@/components/scrubImage";
import { useUserStore } from "@/store/userStore";
import { theme } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet } from "react-native";

export default function OnBoarding() {
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handlePress = () => {
    toggleHasOnboarded();
    router.replace("/");
  };
  return (
    <LinearGradient
      colors={[theme.colorGreen, theme.colorAppleGreen, theme.colorLimeGreen]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.text}>Hi, onboarding</Text>
      <StatusBar style="light" />
      <ScrubImage />
      <ScrubButton title="Let me in!" onPress={handlePress} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
  text: {
    fontSize: 24,
  },
});
