import  { useEffect, useState } from "react";
import useCurrentUserStore from "@/store/currentUserStore";
import firestore from "@react-native-firebase/firestore";

const useGetFriends = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useCurrentUserStore((state) => state);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);

  const getFriends = async () => {
    setError(null);
    if (!user?.uid) {
      console.error("User not authenticated");
      setError("User not authenticated");
      return;
    }
    setLoading(true);

    try {
      const userDoc = await firestore()
        .collection("Users")
        .doc(user?.uid)
        .get();
      if (!userDoc.exists) {
        throw new Error("User document does not exist");
      }
      const friendList = userDoc.data()?.friendList || [];
        if (friendList.length === 0) {
            console.log("No friends found");
            setError("You don't have any friends yet. Add some friends to see them here.");
            setFriends([]);
            return;
        }   
        const friendsDetails = await Promise.all(
            friendList.map(async (friendId) => {
                const friendDoc = await firestore()
                    .collection("Users")
                    .doc(friendId)
                    .get();
                return { id: friendId, ...friendDoc.data(), challenged: false };
            }),
        );
        setFriends(friendsDetails);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return { loading, error, friends };
};

export default useGetFriends;
