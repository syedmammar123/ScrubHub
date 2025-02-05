import React, { useState } from "react";
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

    // Notify mutual friends
    const otherFriendsIds = friendList.filter((id) => id !== friendUid);

    for (const otherFriendId of otherFriendsIds) {
      const otherFriendDocRef = notificationsRef.doc(otherFriendId);
      const otherFriendDoc = await otherFriendDocRef.get();

      const otherFriendNotification = {
        text: `${username} has challenged ${friendUsername}`,
        read: false,
        avatars: [avatarId, friendAvatarId],
        timestamp: firestore.Timestamp.now(),
      };

      if (!otherFriendDoc.exists) {
        batch.set(otherFriendDocRef, {
          notificationsArray: [otherFriendNotification],
        });
      } else {
        const existingNotifications =
          otherFriendDoc.data()?.notificationsArray || [];
        const updatedNotifications = [
          otherFriendNotification,
          ...existingNotifications,
        ];

        batch.update(otherFriendDocRef, {
          notificationsArray: updatedNotifications,
        });
      }
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

  return {
    addChallengeNotification,
    addFriendRequestNotification,
    acceptFriendRequestNotification,
  };
};

export default useAddNotification;
