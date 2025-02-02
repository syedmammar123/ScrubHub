import { Text, View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { Redirect, useRouter } from "expo-router";
import { ScrubButton } from "@/components/scrubButton";
import { getAuth, signOut } from "@react-native-firebase/auth";
import useGetRandomQues from "@/hooks/useGetRandomQues";
import useCurrentUserStore from "@/store/currentUserStore";
import useGetSolvedQues from "@/hooks/useGetSolvedQues";
import ProfilePic from "@/components/ProfilePic";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomAlert from "@/components/CustomAlert";

export default function ProfileScreen() {
  const router = useRouter();
  const { clearUser, user } = useCurrentUserStore((state) => state);

  const { showAlert: deleteAccountAlert } = CustomAlert({
    title: "Delete Account",
    message:
      "This is an irreversible action. Are you sure you want to delete your account?",
    cancelText: "Cancel",
    acceptText: "Confirm",
    onAccept: (uuid) => console.log("Account deleted successfully.", uuid),
  });

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

  if (!user) {
    return <Redirect href="onboarding" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <ProfilePic />
        <Text style={styles.userText}>Hello, {user.username}</Text>
      </View>

      <View style={styles.profileOptions}>
        <Text>
          Questions Solved: <Text>40</Text>/60
        </Text>
        <ScrubButton title="logout" onPress={handleLogout} />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteAccountAlert(user.uid)}
        >
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    alignItems: "center",
    paddingVertical: 20,
  },
  userText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
  },
  profileOptions: {
    width: "100%",
    paddingHorizontal: 20,
    gap: 15,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: 200,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
