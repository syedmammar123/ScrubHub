import useCurrentUserStore from "@/store/currentUserStore";
import firestore from "@react-native-firebase/firestore";
import { useState } from "react";

const useCancelRequest = () => {
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useCurrentUserStore((state) => state);

  const handleCancelRequest = async (itemId) => {
    setLoading(true);
    try {
      const batch = firestore().batch();

      // References to documents
      const myDocRef = firestore().collection("Users").doc(user.uid);
      const theirDocRef = firestore().collection("Users").doc(itemId);

      // Batch update
      batch.update(myDocRef, {
        friendRequestsSent: firestore.FieldValue.arrayRemove(itemId),
      });

      batch.update(theirDocRef, {
        friendRequestsReceived: firestore.FieldValue.arrayRemove(user.uid),
      });

      // Commit batch
      await batch.commit();

      updateUser({
        ...user,
        friendRequestsSent: user.friendRequestsSent
          ? user.friendRequestsSent.filter((id) => id !== itemId)
          : [],
      });

      console.log("Request cancelled");
    } catch (error) {
      console.log("Error sending request:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading,handleCancelRequest };
};

export default useCancelRequest;
