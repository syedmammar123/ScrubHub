import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const useGetScores = ({ scoreField = "totalScore" }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchScores = async () => {
    try {
      setLoading(true);
      const currentUserId = auth().currentUser?.uid;
      if (!currentUserId) {
        throw new Error("User not authenticated");
      }

      const userDoc = await firestore()
        .collection("Users")
        .doc(currentUserId)
        .get();

      if (!userDoc.exists) {
        throw new Error("User document does not exist");
      }

      const initialScores = [
        {
          id: currentUserId,
          name: userDoc.data()?.username,
          [scoreField]: userDoc.data()?.[scoreField],
          avatar: userDoc.data()?.avatarId,
        },
      ];

      const friends = userDoc.data()?.friendList || [];
      if (friends.length === 0) {
        console.log("No friends found");
        setScores(initialScores);
        setLoading(false);
        return;
      }

      const scoresDetails = (
        await Promise.all(
          friends.map(async (friendId) => {
            const friendDoc = await firestore()
              .collection("Users")
              .doc(friendId)
              .get();

            const score = friendDoc.data()?.[scoreField];
            if (score !== null && score !== undefined) {
              return {
                id: friendId,
                avatar: friendDoc.data()?.avatarId,
                name: friendDoc.data()?.username,
                [scoreField]: score,
              };
            }
          })
        )
      ).filter((detail) => detail !== undefined);

      if (scoresDetails.length === 0) {
        console.log("No scores found");
        setScores(initialScores);
        setLoading(false);
        return;
      }

      const sortedScores = [...initialScores, ...scoresDetails].sort(
        (a, b) => b[scoreField] - a[scoreField]
      );

      setScores(sortedScores);
    } catch (error) {
      console.error("Error fetching scores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return { scores, loading };
};

export default useGetScores;
