import { Text, View, StyleSheet } from "react-native";
import { theme } from "../../theme";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/userStore";
import { ScrubButton } from "@/components/scrubButton";
import { getAuth, signOut } from "@react-native-firebase/auth";
import useGetRandomQues from "@/hooks/useGetRandomQues";

export default function ProfileScreen() {
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const { randomQues, loading } = useGetRandomQues();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log("User signed out successfully.");

      toggleHasOnboarded();

      router.navigate("/onboarding");
    } catch (error) {
      toggleHasOnboarded();

      router.navigate("/onboarding");
      console.error("Error during sign out:", error);
    }
  };

  // console.log("randomQues", randomQues);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <ScrubButton title="logout" onPress={handleLogout} />
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
