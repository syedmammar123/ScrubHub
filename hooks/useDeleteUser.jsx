import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { getAuth, signOut } from "@react-native-firebase/auth";
import useCurrentUserStore from "@/store/currentUserStore";
import { useRouter } from "expo-router";

const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, clearUser } = useCurrentUserStore((state) => state);

  const router = useRouter();

  const handleDeleteUser = async () => {
    setLoading(true);
    setError(null);
    if (!user?.uid) {
      console.error("User not authenticated");
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const userUid = user.uid;

    try {
      const userRef = firestore().collection("Users").doc(userUid);
      const notificationsRef = firestore()
        .collection("Notifications")
        .doc(userUid);
      const challengesRef = firestore().collection("Challenges");

      // Delete user document
      await userRef.delete();
      console.log(`User ${userUid} deleted from Users collection`);

      // Delete notification document
      await notificationsRef.delete();
      console.log(
        `Notification ${userUid} deleted from Notifications collection`,
      );

      // Fetch all challenge docs where challengerId or opponentId matches userUid
      const challengesSnapshot = await challengesRef
        .where("challengerId", "==", userUid)
        .get();

      const opponentChallengesSnapshot = await challengesRef
        .where("opponentId", "==", userUid)
        .get();

      // Combine both results to avoid duplicates
      const challengeDocs = [
        ...challengesSnapshot.docs,
        ...opponentChallengesSnapshot.docs,
      ];

      // Delete all matching challenge documents
      const deletePromises = challengeDocs.map((doc) => doc.ref.delete());
      await Promise.all(deletePromises);
      console.log(
        `Deleted ${challengeDocs.length} challenges involving user ${userUid}`,
      );
      const auth = getAuth();
      await signOut(auth);
      console.log("User signed out successfully.");

      clearUser();

      router.push("/onboarding");
    } catch (error) {
      console.error("Error during deleting user:", error);
      setError(error || "Error during deleting user");
    }
  };

  return { loading, error, handleDeleteUser };
};

export default useDeleteUser;
