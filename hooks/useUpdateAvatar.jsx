import useCurrentUserStore from "@/store/currentUserStore";
import firestore from "@react-native-firebase/firestore";
import { useState } from "react";

const useUpdateAvatar = (setModalVisible) => {
  const { user, updateUser } = useCurrentUserStore((state) => state);
  const [loading, setLoading] = useState(false);

  const updateAvatar = async (avatarId) => {
    setLoading(true);
    try {
      const currentUserId = user.uid;
      if (!currentUserId) {
        throw new Error("User not authenticated");
      }
      await firestore().collection("Users").doc(currentUserId).update({
        avatarId,
      });

      updateUser({ ...user, avatarId });
      setModalVisible(false);
    } catch (error) {
      console.log("Error updating avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateAvatar };
};

export default useUpdateAvatar;
