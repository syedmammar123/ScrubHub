import { useEffect, useState } from "react";
import useCurrentUserStore from "@/store/currentUserStore";
import firestore from "@react-native-firebase/firestore";

const useGetChallenges = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUserChallenges } = useCurrentUserStore((state) => state);

  const getChallenges = async () => {
    setError(null);

    if (!user?.uid) {
      console.error("User not authenticated");
      setError("User not authenticated");
      setLoading(false);
      return;
    }
    try {
      const challengesRef = firestore().collection("Challenges");
      const userRef = firestore().collection("Users");

      // Fetch challenges where user is opponent or challenger
      const [opponentQuerySnapshot, challengerQuerySnapshot] =
        await Promise.all([
          challengesRef.where("opponentId", "==", user?.uid).get(),
          challengesRef.where("challengerId", "==", user?.uid).get(),
        ]);

      const allChallenges = [
        ...opponentQuerySnapshot.docs,
        ...challengerQuerySnapshot.docs,
      ];

      if (allChallenges.length === 0) {
        console.log("No challenges found.");
        setError("No challenges found");
        return;
      }

      // Get all unique user IDs for batch fetching
      const userIds = new Set();
      allChallenges.forEach((doc) => {
        const data = doc.data();
        userIds.add(data.challengerId);
        userIds.add(data.opponentId);
      });

      // Fetch all user data in a single query
      const userDocs = await userRef
        .where(firestore.FieldPath.documentId(), "in", Array.from(userIds))
        .get();
      const userMap = userDocs.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data(); // Store user data by user ID
        return acc;
      }, {});

      // Map challenges with user details
      const formattedChallenges = allChallenges.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          challengerUsername: userMap[data.challengerId]?.username || "Unknown",
          challengerAvatarId: userMap[data.challengerId]?.avatarId || "",
          opponentUsername: userMap[data.opponentId]?.username || "Unknown",
          opponentAvatarId: userMap[data.opponentId]?.avatarId || "",
        };
      });

      console.log("Fetched Challenges:", formattedChallenges);
      setUserChallenges(formattedChallenges);
    } catch (error) {
      console.error("Error fetching challenges:", error);
      setError(
        error.message || "An error occurred while fetching notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChallenges();
  }, [user.uid]);

  return { loading, error };
};

export default useGetChallenges;
