import { useUserStore } from "@/store/userStore";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import { Text, View, Button, StyleSheet } from "react-native";

export default function OnBoarding() {
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handlePress = () => {
    toggleHasOnboarded();
    router.replace("/");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hi, onboarding</Text>
      <Button title="Let me in!" onPress={handlePress} />
    </View>
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
