import useCurrentUserStore from "@/store/currentUserStore";
import firestore from "@react-native-firebase/firestore";
import { useState } from "react";

const useSendRequest = () => {
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useCurrentUserStore((state) => state);

  const handleSendRequest = async (itemId) => {
    setLoading(true);
    try {
      const batch = firestore().batch();

      // References to documents
      const myDocRef = firestore().collection("Users").doc(user.uid);
      const theirDocRef = firestore().collection("Users").doc(itemId);

      // Batch update
      batch.update(myDocRef, {
        friendRequestsSent: firestore.FieldValue.arrayUnion(itemId),
      });

      batch.update(theirDocRef, {
        friendRequestsReceived: firestore.FieldValue.arrayUnion(user.uid),
      });

      // Commit batch
      await batch.commit();

      updateUser({
        ...user,
        friendRequestsSent: [...(user.friendRequestsSent ?? []), itemId],
      });

      console.log("Request sent");
    } catch (error) {
      console.log("Error sending request:", error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, handleSendRequest };
};

export default useSendRequest;
