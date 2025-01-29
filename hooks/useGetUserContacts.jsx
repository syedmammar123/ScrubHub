import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import useCurrentUserStore from "@/store/currentUserStore";

const useGetUserContacts = ({ userContacts }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useCurrentUserStore((state) => state);

  const getUserContacts = async () => {
    if (!userContacts) {
      return;
    }

    try {
      const currentUserId = user.uid;
      if (!currentUserId) {
        throw new Error("User not authenticated");
      }
      const friendList = user.friendList;
      const friendRequestsReceived = user.friendRequestsReceived;
      const friendRequestsSent = user.friendRequestsSent;

      if (friendList.length !== 0) {
        const friendListUsers = await firestore()
          .collection("Users")
          .where("uid", "in", friendList)
          .get();

        const friendListPhoneNumbers = friendListUsers.docs
          .map((doc) => doc.data().phoneNumber)
          .filter((phoneNumber) => phoneNumber);

        //This will filter out the contacts that are already in the friend list
        userContacts = userContacts.filter(
          (contact) => !friendListPhoneNumbers.includes(contact.phoneNumber)
        );
      }

      let friendRequestsReceivedUsers = [];
      if (friendRequestsReceived.length !== 0) {
        friendRequestsReceivedUsers = await firestore()
          .collection("Users")
          .where("uid", "in", friendRequestsReceived)
          .get();
      }

      let friendRequestsSentUsers = [];
      if (friendRequestsSent.length !== 0) {
        friendRequestsSentUsers = await firestore()
          .collection("Users")
          .where("uid", "in", friendRequestsSent)
          .get();
      }

      const receivedSet = new Set(
        friendRequestsReceivedUsers.map((doc) => doc.data().phoneNumber)
      );
      const sentSet = new Set(
        friendRequestsSentUsers.map((doc) => doc.data().phoneNumber)
      );

      userContacts.forEach((contact) => {
        if (receivedSet.has(contact.phoneNumber)) {
          contact.status = "received";
        } else if (sentSet.has(contact.phoneNumber)) {
          contact.status = "sent";
        } else {
          contact.status = "add";
        }
      });

      setContacts(userContacts);
    } catch (error) {
      console.log("Error fetching Contacts: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userContacts.length === 0) return; // No need to fetch contacts if there are none
    getUserContacts();
  }, [userContacts]);

  return { contacts, loading };
};

export default useGetUserContacts;
