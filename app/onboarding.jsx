import { ScrubButton } from "@/components/scrubButton";
import { ScrubImage } from "@/components/scrubImage";
import { useUserStore } from "@/store/userStore";
import { theme } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";

export default function OnBoarding() {
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handlePress = () => {
    toggleHasOnboarded();
    router.navigate("/register");
  };
  return (
    <LinearGradient
      colors={[theme.colorWhite, theme.colorWhite, theme.colorWhite]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrubImage />
      <View style={styles.buttonContainer}>
        <ScrubButton
          title="Get Started"
          onPress={handlePress}
          color={theme.colorBlack}
          width={"100%"}
        />
        <Text style={styles.termsText}>
          By signing up you agree to our{" "}
          <Text style={styles.highlightedText}>Terms</Text> and{" "}
          <Text style={styles.highlightedText}>Privacy Policy</Text>. We protect
          your personal data.
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },

  buttonContainer: {
    alignItems: "center",
    width: "85%",
    marginTop: -20,
    marginBottom: -40,
  },
  termsText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 30,
    fontWeight: "500",
    width: "95%",
  },
  highlightedText: {
    color: "red",
    fontWeight: "bold",
  },
});
