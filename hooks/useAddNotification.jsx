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
      batch.update(friendDocRef, {
        notificationsArray: firestore.FieldValue.arrayUnion(newNotification),
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
        batch.update(otherFriendDocRef, {
          notificationsArray: firestore.FieldValue.arrayUnion(
            otherFriendNotification
          ),
        });
      }
    }
  };

  const addFriendRequestNotification = async (friendId) => {
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
    addFriendRequestNotification,
    acceptFriendRequest,
  };
};

export default useAddNotification;
