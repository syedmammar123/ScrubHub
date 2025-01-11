import React, { useEffect, useState } from 'react'
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const useGetInvitations = () => {
    const [invitations,setInvitations] = useState([]);
    const [invitationsLoading, setInvitationsLoading] = useState(false);


    const fetchInvitations = async () => {
        try {
            setInvitationsLoading(true);
          const currentUserId = auth().currentUser?.uid;
          if (!currentUserId) {
            throw new Error("User not authenticated");
          }
          const userDoc = await firestore().collection("Users").doc(currentUserId).get();
          if (!userDoc.exists) {
            throw new Error("User document does not exist");
          }
          const friendRequestsReceived = userDoc.data()?.friendRequestsReceived || [];
          if (friendRequestsReceived.length === 0) {
            console.log("No friend requests found");
            setInvitations([]);
            setInvitationsLoading(false);
            return;
          }
          const invitationsDetails = await Promise.all(
            friendRequestsReceived.map(async (friendId) => {
              const friendDoc = await firestore().collection("Users").doc(friendId).get();
              return { id: friendId, ...friendDoc.data() };
            })
          );
          setInvitationsLoading(false);
          setInvitations(invitationsDetails);
        } catch (error) {
            setInvitationsLoading(false);
          console.error("Error fetching invitations:", error);
          Alert.alert("Error", "Unable to fetch invitations. Please try again later.");
          
        }

    }
  
    useEffect(() => {
      fetchInvitations();
    },[])
  return (
    {invitations, invitationsLoading, setInvitations}
  )
}

export default useGetInvitations