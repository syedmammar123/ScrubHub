import useCurrentUserStore from "@/store/currentUserStore";
import firestore from "@react-native-firebase/firestore";

const notificationsText = {
  friendRequestRecieved: "sent you a friend request",
  challenge: "challenged you",
  friendRequestAccepted: "accepted your friend request",
};

const notificationsType = {
  friendRequestRecieved: "friendRequestRecieved",
  challenge: "challenge",
  friendRequestAccepted: "friendRequestAccepted",
  challengeCompleted: "challengeCompleted",
};

const useAddNotification = () => {
  const { user } = useCurrentUserStore((state) => state);

  const addChallengeNotification = async (
    batch,
    challengeDocumentId,
    {
      friendUid,
      friendUsername,
      friendAvatarId,
      username,
      avatarId,
      friendList,
    }
  ) => {
    const notificationsRef = firestore().collection("Notifications");

    // Reference to the friend's notification document in the Notifications collection
    const friendDocRef = notificationsRef.doc(friendUid);
    const friendDoc = await friendDocRef.get();

    const newNotification = {
      text: `${username} has ${notificationsText.challenge}`,
      read: false,
      avatars: [avatarId],
      timestamp: firestore.Timestamp.now(),
      type: notificationsType.challenge,
      documentId: challengeDocumentId,
    };

    if (!friendDoc.exists) {
      batch.set(friendDocRef, { notificationsArray: [newNotification] });
    } else {
      const existingNotifications = friendDoc.data()?.notificationsArray || [];
      const updatedNotifications = [newNotification, ...existingNotifications]; // Add at the start

      batch.update(friendDocRef, {
        notificationsArray: updatedNotifications,
      });
    }
  };

  const addFriendRequestNotification = (batch, friendId) => {
    try {
      const firestoreRef = firestore().collection("Notifications");
      const friendDocRef = firestoreRef.doc(friendId);

      batch.set(
        friendDocRef,
        {
          notificationsArray: firestore.FieldValue.arrayUnion({
            text: `${user.username} ${notificationsText.friendRequestRecieved}`,
            read: false,
            avatars: [user.avatarId],
            timestamp: firestore.Timestamp.now(),
            type: notificationsType.friendRequestRecieved,
          }),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error in addFriendRequestNotification:", error);
    }
  };

  const acceptFriendRequestNotification = (batch, friendId) => {
    try {
      const firestoreRef = firestore().collection("Notifications");
      const friendDocRef = firestoreRef.doc(friendId);

      batch.set(
        friendDocRef,
        {
          notificationsArray: firestore.FieldValue.arrayUnion({
            text: `${user.username} ${notificationsText.friendRequestAccepted}`,
            read: false,
            avatars: [user.avatarId],
            timestamp: firestore.Timestamp.now(),
            type: notificationsType.friendRequestAccepted,
          }),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error in acceptFriendRequestNotification:", error);
    }
  };

  const addChallengeCompletedNotification = async (
    batch,
    challengeId,
    challengerId,
    challengerName,
    challengerScore,
    challengerAvatarId,
    userFriendList,
    challengerFriendList,
    myScore,
    myName
  ) => {
    try {
      const firestoreRef = firestore().collection("Notifications");
      const notificationText =
        myScore > challengerScore
          ? `${myName} has won the challenge. He scored ${myScore}. While ${challengerName}'s score was ${challengerScore}`
          : `${myName} has lost the challenge. He scored ${myScore}. While ${challengerName}'s score was ${challengerScore}`;
  
      // Update the challenger's notifications
      batch.set(
        firestoreRef.doc(challengerId),
        {
          notificationsArray: firestore.FieldValue.arrayUnion({
            text: notificationText,
            read: false,
            avatars: [user.avatarId],
            timestamp: firestore.Timestamp.now(),
            type: notificationsType.challengeCompleted,
            documentId: challengeId,
          }),
        },
        { merge: true }
      );
  
      // Merge both user and challenger friend lists and remove duplicates
      const uniqueFriendList = [...new Set([...userFriendList, ...challengerFriendList])];
  
      if (uniqueFriendList.length === 0) return;
  
      // Notify mutual friends
      for (const friendId of uniqueFriendList) {
        batch.set(
          firestoreRef.doc(friendId),
          {
            notificationsArray: firestore.FieldValue.arrayUnion({
              text: notificationText,
              read: false,
              avatars: [user.avatarId, challengerAvatarId],
              timestamp: firestore.Timestamp.now(),
              documentId: challengeId,
            }),
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error("Error in addChallengeCompletedNotification:", error);
    }
  };

  return {
    addChallengeNotification,
    addFriendRequestNotification,
    acceptFriendRequestNotification,
    addChallengeCompletedNotification
  };
};

export default useAddNotification;
