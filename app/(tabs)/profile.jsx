import { Text, View, StyleSheet } from "react-native";
import { theme } from "../../theme";
import { useRouter } from "expo-router";
import { ScrubButton } from "@/components/scrubButton";
import { getAuth, signOut } from "@react-native-firebase/auth";
import useGetRandomQues from "@/hooks/useGetRandomQues";
import useCurrentUserStore from "@/store/currentUserStore";
import useGetSolvedQues from "@/hooks/useGetSolvedQues";


export default function ProfileScreen() {
  const router = useRouter();
  const { clearUser } = useCurrentUserStore((state) => state);


  // const { randomQues, loading } = useGetRandomQues();
  // const { loading, solvedQues } = useGetSolvedQues();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log("User signed out successfully.");

      clearUser();

      router.navigate("/onboarding");
    } catch (error) {
      router.navigate("/onboarding");
      console.error("Error during sign out:", error);
    }
  };

  // console.log("solvedQues", solvedQues);
  // console.log("loading", loading);
 

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
