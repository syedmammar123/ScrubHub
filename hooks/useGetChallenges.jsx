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
        if (data.challengerId !== user.uid) userIds.add(data.challengerId);
        if (data.opponentId !== user.uid) userIds.add(data.opponentId);
      });

      if (userIds.size === 0) {
        console.log("No additional users to fetch.");
        setUserChallenges(
          allChallenges.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        return;
      }

      // Fetch all user data in a single query
      const userDocs = await userRef
        .where(firestore.FieldPath.documentId(), "in", Array.from(userIds))
        .get();

      const userMap = userDocs.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data(); // Store user data by user ID
        return acc;
      }, {});

      // Map challenges with user details, only adding properties if they exist
      const formattedChallenges = allChallenges.map((doc) => {
        const data = doc.data();
        const challengeObj = { id: doc.id, ...data };

        if (userMap[data.challengerId]?.username) {
          challengeObj.challengerUsername = userMap[data.challengerId].username;
        }
        if (userMap[data.challengerId]?.avatarId) {
          challengeObj.challengerAvatarId = userMap[data.challengerId].avatarId;
        }
        if (userMap[data.opponentId]?.username) {
          challengeObj.opponentUsername = userMap[data.opponentId].username;
        }
        if (userMap[data.opponentId]?.avatarId) {
          challengeObj.opponentAvatarId = userMap[data.opponentId].avatarId;
        }

        return challengeObj;
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
  }, []);

  return { loading, error };
};

export default useGetChallenges;
