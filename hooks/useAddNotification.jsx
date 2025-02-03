import React, { useState } from "react";
import useCurrentUserStore from "@/store/currentUserStore";
import firestore from "@react-native-firebase/firestore";

const notificationsText = {
  friendRequest: "sent you a friend request",
  challenge: "challenged you",
  friendRequestAccepted: "accepted your friend request",
};

const notificationsType = {
  friendRequest: "friendRequest",
  challenge: "challenge",
};

const useAddNotification = () => {
  const [challengeLoading, setChallengeLoading] = useState(false);
  const [friendRequestLoading, setFriendRequestLoading] = useState(false);
  const { user } = useCurrentUserStore((state) => state);

  const addChallengeNotification = async (friendId) => {
    setChallengeLoading(true);
    try {
      const currentUserId = user.uid;
      if (!currentUserId) {
        throw new Error("User not authenticated");
      }

      const firestoreRef = firestore().collection("Users");

      // Fetch friend's data
      const friendDoc = await firestoreRef.doc(friendId).get();
      if (!friendDoc.exists) {
        throw new Error("Friend data not found");
      }

      const friendData = friendDoc.data();

      // Update the friend's notifications array
      await firestoreRef.doc(friendId).update({
        notifications: firestore.FieldValue.arrayUnion({
          text: `${user.username} has ${notificationsText.challenge}`,
          read: false,
          avatars: [user.avatarId],
          timestamp: firestore.Timestamp.now(),
          type: notificationsType.challenge,
        }),
      });

      // Update other friends' notifications array
      const otherFriendsIds = user.friendList.filter((id) => id !== friendId);
      if (otherFriendsIds.length > 0) {
        const batch = firestore().batch();

        otherFriendsIds.forEach((otherFriendId) => {
          const otherFriendDoc = firestoreRef.doc(otherFriendId);
          batch.update(otherFriendDoc, {
            notifications: firestore.FieldValue.arrayUnion({
              text: `${user.username} has challenged ${friendData.username}`,
              read: false,
              avatars: [user.avatarId, friendData.avatarId],
              timestamp: firestore.Timestamp.now(),
            }),
          });
        });

        await batch.commit();
      }

      console.log("Notification added!");
    } catch (error) {
      console.error(error);
    } finally {
      setChallengeLoading(false);
    }
  };

  const addFriendRequestNotification = async (friendId) => {
    setFriendRequestLoading(true);
    try {
      const currentUserId = user?.uid;
      if (!currentUserId) {
        throw new Error("User not authenticated");
      }

      const firestoreRef = firestore().collection("Users");
      const friendDocRef = firestoreRef.doc(friendId);

      // Ensure friend exists before updating
      const friendDoc = await friendDocRef.get();
      if (!friendDoc.exists) {
        throw new Error("Friend data not found");
      }

      // Update the friend's notifications array
      await friendDocRef.update({
        notifications: firestore.FieldValue.arrayUnion({
          text: `${user.username} ${notificationsText.friendRequest}`,
          read: false,
          avatars: [user.avatarId],
          timestamp: firestore.Timestamp.now(),
          type: notificationsType.friendRequest,
        }),
      });

      console.log("Notification added successfully!");
    } catch (error) {
      console.error(
        "Error in addFriendRequestNotification Notification: ",
        error
      );
    } finally {
      setFriendRequestLoading(false);
    }
  };

  const acceptFriendRequest = async (friendId) => { 
    try {
      const currentUserId = user?.uid;
      if (!currentUserId) {
        throw new Error("User not authenticated");
      }

      const firestoreRef = firestore().collection("Users");
      const friendDocRef = firestoreRef.doc(friendId);

      // Ensure friend exists before updating
      const friendDoc = await friendDocRef.get();
      if (!friendDoc.exists) {
        throw new Error("Friend data not found");
      }

      // Update the friend's notifications array
      await friendDocRef.update({
        notifications: firestore.FieldValue.arrayUnion({
          text: `${user.username} ${notificationsText.friendRequestAccepted}`,
          read: false,
          avatars: [user.avatarId],
          timestamp: firestore.Timestamp.now(),
        }),
      });

      console.log("Notification added successfully!");
    } catch (error) {
      console.error(
        "Error in addFriendRequestNotification Notification: ",
        error
      );
    } finally {
      setFriendRequestLoading(false);
    }
  };

  return {
    addChallengeNotification,
    challengeLoading,
    friendRequestLoading,
    addFriendRequestNotification,
    acceptFriendRequest
  };
};

export default useAddNotification;
