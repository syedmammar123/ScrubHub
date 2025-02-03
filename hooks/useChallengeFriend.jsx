import { useState } from "react";
import useCurrentUserStore from "@/store/currentUserStore";
import firestore, { doc } from "@react-native-firebase/firestore";
import useAddNotification from "./useAddNotification";

const useChallengeFriend = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useCurrentUserStore((state) => state);
  const { addChallengeNotification } = useAddNotification();

  const challengeFriend = async (friendId, myScore, questions) => {
    if (!user?.uid) {
      console.error("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const { uid: currentUserId, username, avatarId, friendList } = user;

      // Fetch friend's document
      const friendRef = firestore().collection("Users").doc(friendId);
      const friendDoc = await friendRef.get();

      if (!friendDoc.exists) {
        throw new Error("Friend data not found");
      }

      const {
        uid: friendUid,
        username: friendUsername,
        avatarId: friendAvatarId,
      } = friendDoc.data();

      // Firestore batch operation
      const batch = firestore().batch();
      const challengeRef = firestore().collection("Challenges").doc();

      const challengeData = {
        challengerId: currentUserId,
        opponentId: friendId,
        challengerScore: myScore,
        opponentScore: 0,
        status: "pending",
        questions,
        timestamp: firestore.Timestamp.now(),
      };

      batch.set(challengeRef, challengeData);

      // Add challenge notification
      await addChallengeNotification(batch, challengeRef.id, {
        friendUid,
        friendUsername,
        friendAvatarId,
        username,
        avatarId,
        friendList,
      });

      await batch.commit();
      console.log("Challenge and notifications added!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { challengeFriend, loading };
};

export default useChallengeFriend;
