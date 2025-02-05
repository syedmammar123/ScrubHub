import { View, Text } from "react-native";
import React, { useEffect } from "react";
import useCurrentUserStore from "@/store/currentUserStore";

const useGetNotifications = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUserNotifications } = useCurrentUserStore((state) => state);

  const getNotifications = async () => {
    setError(null);
    if (!user?.uid) {
      console.error("User not authenticated");
      return;
    }
    setLoading(true);
    try {
      const notificationsRef = firestore()
        .collection("Notifications")
        .doc(user.uid);
      const doc = await notificationsRef.get();
      if (!doc.exists) {
        console.log("No notifications found.");
        return;
      }
      const notifications = doc.data()?.notificationsArray || [];

      if(notifications.length === 0) {
        console.log("No notifications found.");
        return;
      }

      console.log("Fetched Notifications:", notifications);
      setUserNotifications(notifications);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return { loading, error };
};

export default useGetNotifications;
