import { Text, View, StyleSheet } from "react-native";
import { theme } from "../../theme";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/userStore";
import { ScrubButton } from "@/components/scrubButton";

export default function ProfileScreen() {
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handlePress = () => {
    toggleHasOnboarded();
    router.navigate("/");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <ScrubButton title="logout" onPress={handlePress} />
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
