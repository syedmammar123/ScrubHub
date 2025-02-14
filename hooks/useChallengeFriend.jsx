import { useState } from "react";
import useCurrentUserStore from "@/store/currentUserStore";
import firestore from "@react-native-firebase/firestore";
import useAddNotification from "./useAddNotification";
import useQuesStore from "@/store/quesStore";

const useChallengeFriend = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useCurrentUserStore((state) => state);
  const { addChallengeNotification, addChallengeCompletedNotification } =
    useAddNotification();

  const {
    clearFieldsAfterChallengeFriend
  } = useQuesStore((state) => state);

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
        opponentScore: null,
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

      clearFieldsAfterChallengeFriend()
      console.log("Challenge and notifications added!");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const challengeCompleted = async (
    challengeId,
    challengerId,
    myScore,
    challengerScore,
  ) => {
    if (!user?.uid) {
      console.error("User not authenticated");
      return false;
    }

    setLoading(true);
    try {
      const { uid: currentUserId, username, avatarId } = user;
      const firestoreRef = firestore();

      // Fetch user and challenger data in parallel
      const [userDoc, challengerDoc, challengeDoc] = await Promise.all([
        firestoreRef.collection("Users").doc(currentUserId).get(),
        firestoreRef.collection("Users").doc(challengerId).get(),
        firestoreRef.collection("Challenges").doc(challengeId).get(),
      ]);

      if (!challengerDoc.exists) throw new Error("Friend data not found");
      if (!challengeDoc.exists) throw new Error("Challenge document not found");

      const userFriendList =
        userDoc.data()?.friendList.filter((id) => id !== challengerId) || [];
      const challengerFriendList =
        challengerDoc.data()?.friendList.filter((id) => id !== currentUserId) ||
        [];
      const { username: challengerUsername, avatarId: challengerAvatarId } =
        challengerDoc.data();

      // Firestore batch operation
      const batch = firestoreRef.batch();

      batch.set(
        firestoreRef.collection("Challenges").doc(challengeId),
        {
          opponentScore: myScore,
          status: "completed",
          timestamp: firestore.Timestamp.now(),
        },
        { merge: true },
      );

      // Add challenge notification
      await addChallengeCompletedNotification(
        batch,
        challengeId,
        challengerId,
        challengerUsername,
        challengerScore,
        challengerAvatarId,
        userFriendList,
        challengerFriendList,
        myScore,
        username,
      );

      // Commit batch only if there are changes
      await batch.commit();
      console.log("Challenge and notifications added!");

      return true;
    } catch (error) {
      console.error("Error in challengeCompleted:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { challengeFriend, loading, challengeCompleted };
};

export default useChallengeFriend;
