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
      let allChallenges = [];
      const challengesRef = firestore().collection("Challenges");

      // Fetch where user is the opponent
      const opponentQuerySnapshot = await challengesRef
        .where("opponentId", "==", user?.uid)
        .get();

      // Fetch where user is the challenger
      const challengerQuerySnapshot = await challengesRef
        .where("challengerId", "==", user?.uid)
        .get();

      if (!opponentQuerySnapshot.empty) {
        const opponentChallenges = opponentQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        allChallenges = [...allChallenges, ...opponentChallenges];
      }

      if (!challengerQuerySnapshot.empty) {
        const challengerChallenges = challengerQuerySnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );
        allChallenges = [...allChallenges, ...challengerChallenges];
      }

      if (!allChallenges.length) {
        console.log("No challenges found.");
        setError("No challenges found");
        return;
      }

      console.log("Fetched Challenges:", allChallenges);
      setUserChallenges(allChallenges);
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
