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
import useChallengeFriend from "@/hooks/useChallengeFriend";

const data = [
  {
    correctAnswers: {
      A: "Thromboembolism prevention",
      B: "Rhythm control",
      C: "Monitor patient",
    },
    diagram:
      "Assess clinical status → Evaluate need for {{A}} → Consider rate control → Evaluate need for {{B}} → Implement treatment → {{C}}",
    id: "cardiovascular_atrial fibrillation_flowChart_65fe2fcf-0fb4-4064-bc08-a7f678caf276",
    isReviewed: false,
    lastReviewed: null,
    options: [
      "Review CHA2DS2-VASc score",
      "Rhythm control",
      "Thromboembolism prevention",
      "Monitor patient",
    ],
    question:
      "Outline the sequence for determining treatment in atrial fibrillation. Complete the missing steps:",
    questionId:
      "cardiovascular_atrial fibrillation_flowChart_65fe2fcf-0fb4-4064-bc08-a7f678caf276",
    questionNo: 42,
    questionStyle: "flowChart",
  },
  {
    correctAnswers: {
      A: "P",
      B: "Fibrillation",
    },
    diagram:
      "Absent {{A}} → Irregular intervals → {{B}} waves → Confirmation of AF",
    id: "cardiovascular_atrial fibrillation_flowChart_3f775941-ce18-46e7-b670-fe94e9e3b82d",
    isReviewed: false,
    lastReviewed: null,
    options: ["P", "Fibrillation", "Flutter", "T"],
    question:
      "Sequence of ECG findings in atrial fibrillation diagnosis. Identify missing terms:",
    questionId:
      "cardiovascular_atrial fibrillation_flowChart_3f775941-ce18-46e7-b670-fe94e9e3b82d",
    questionNo: 45,
    questionStyle: "flowChart",
  },
  {
    answer: "Echocardiogram",
    id: "cardiovascular_atrial fibrillation_testToOrder_dab2a26d-b40c-4da1-9346-cda01192e9ce",
    isReviewed: false,
    lastReviewed: null,
    options: [
      "Echocardiogram",
      "Stress echo",
      "24-hour Holter monitor",
      "Multi-gated acquisition (MUGA) scan",
    ],
    question:
      "Condition: Stable atrial fibrillation with uncertain ventricular function.",
    questionId:
      "cardiovascular_atrial fibrillation_testToOrder_dab2a26d-b40c-4da1-9346-cda01192e9ce",
    questionNo: 86,
    questionStyle: "testToOrder",
  },
  {
    answer: "Start diuretics",
    id: "cardiovascular_atrial fibrillation_lab_c2945129-0531-4693-be04-c321bb555ec1",
    isReviewed: false,
    lastReviewed: null,
    options: [
      "Start diuretics",
      "Initiate digoxin",
      "Discontinue anticoagulation",
      "Perform cardioversion",
    ],
    question: "Labs: BNP 900 pg/mL in a patient with atrial fibrillation.",
    questionId:
      "cardiovascular_atrial fibrillation_lab_c2945129-0531-4693-be04-c321bb555ec1",
    questionNo: 74,
    questionStyle: "lab",
  },
  {
    answer: "Thrombin",
    hint: "Component of the blood responsible for clotting, must be regulated in atrial fibrillation.",
    id: "cardiovascular_atrial fibrillation_scrabble_1b62cd6b-8dae-4ded-92af-f9636d7ab312",
    isReviewed: false,
    lastReviewed: null,
    letterChoices: [
      "T",
      "H",
      "R",
      "O",
      "M",
      "B",
      "I",
      "N",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
    ],
    questionId:
      "cardiovascular_atrial fibrillation_scrabble_1b62cd6b-8dae-4ded-92af-f9636d7ab312",
    questionNo: 59,
    questionStyle: "scrabble",
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { clearUser, user } = useCurrentUserStore((state) => state);
  const { challengeFriend, loading } = useChallengeFriend();

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

  const handleChallengeFriend = () => {
    challengeFriend("FrTsL0JPgZaBSMvPoGHErIpU1iz2", 10, data);
  };

  console.log("loading", loading);

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
          onPress={handleChallengeFriend}
        >
          <Text>Challenge a friend</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => router.navigate("ChallengeFriend")}
        >
          <Text>Score Screen</Text>
        </TouchableOpacity>
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
