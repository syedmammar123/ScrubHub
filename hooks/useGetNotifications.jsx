import { useEffect, useState } from "react";
import useCurrentUserStore from "@/store/currentUserStore";
import firestore from "@react-native-firebase/firestore";

const useGetNotifications = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUserNotifications } = useCurrentUserStore((state) => state);

  const getNotifications = async () => {
    setError(null);
    if (!user?.uid) {
      console.error("User not authenticated");
      setError("User not authenticated");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const notificationsRef = firestore()
        .collection("Notifications")
        .doc(user.uid);
      const doc = await notificationsRef.get();

      if (!doc.exists || !doc.data()?.notificationsArray?.length) {
        console.log("No notifications found.");
        setError("No notifications found");
        return;
      }

      const notifications = doc.data()?.notificationsArray || [];
      setUserNotifications(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError(
        error.message || "An error occurred while fetching notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [user?.uid]); 

  return { loading, error };
};

export default useGetNotifications;
