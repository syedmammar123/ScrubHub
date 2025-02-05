import React, { useState } from "react";
import useCurrentUserStore from "@/store/currentUserStore";
import firestore from "@react-native-firebase/firestore";
import useAddNotification from "./useAddNotification";

const useAcceptRequest = () => {
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useCurrentUserStore((state) => state);
  const {acceptFriendRequestNotification} = useAddNotification();

  const handleAcceptRequest = async (itemId) => {
    setLoading(true);
    try {
      const batch = firestore().batch();

      // References to documents
      const myDocRef = firestore().collection("Users").doc(user.uid);
      const theirDocRef = firestore().collection("Users").doc(itemId);

      // Batch update
      batch.update(myDocRef, {
        friendList: firestore.FieldValue.arrayUnion(itemId),
        friendRequestsReceived: firestore.FieldValue.arrayRemove(itemId),
      });

      batch.update(theirDocRef, {
        friendList: firestore.FieldValue.arrayUnion(user.uid),
        friendRequestsSent: firestore.FieldValue.arrayRemove(user.uid),
      });

      acceptFriendRequestNotification(batch, itemId);

      // Commit batch
      await batch.commit();

      // Manually update the local state instead of fetching again
      updateUser({
        ...user,
        friendList: [...(user.friendList ?? []), itemId],
        friendRequestsReceived: user.friendRequestsReceived
          ? user.friendRequestsReceived.filter((id) => id !== itemId)
          : [],
      });

      console.log("Request accepted");
    } catch (error) {
      console.error("Error accepting request:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleAcceptRequest };
};

export default useAcceptRequest;
