import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import useCurrentUserStore from "@/store/currentUserStore";

const useGetUserContacts = ({ userContacts }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useCurrentUserStore((state) => state);

  const getUserContacts = async () => {
    try {
      const currentUserId = user.uid;
      if (!currentUserId) {
        throw new Error("User not authenticated");
      }

      const { friendList, friendRequestsReceived, friendRequestsSent } = user;
      let userContactsCopy = [...userContacts];

      // Query Users only when necessary
      const phoneNumbersPromises = [];

      if (friendList.length > 0) {
        phoneNumbersPromises.push(
          firestore()
            .collection("Users")
            .where("uid", "in", friendList)
            .get()
            .then((friendListUsers) =>
              friendListUsers.docs.map((doc) => doc.data().phoneNumber)
            )
        );
      }

      if (friendRequestsReceived.length > 0) {
        phoneNumbersPromises.push(
          firestore()
            .collection("Users")
            .where("uid", "in", friendRequestsReceived)
            .get()
            .then((receivedUsers) =>
              receivedUsers.docs.map((doc) => doc.data().phoneNumber)
            )
        );
      }

      if (friendRequestsSent.length > 0) {
        phoneNumbersPromises.push(
          firestore()
            .collection("Users")
            .where("uid", "in", friendRequestsSent)
            .get()
            .then((sentUsers) =>
              sentUsers.docs.map((doc) => doc.data().phoneNumber)
            )
        );
      }

      // Execute all Firestore queries simultaneously
      const [friendListPhoneNumbers, receivedPhoneNumbers, sentPhoneNumbers] =
        await Promise.all(phoneNumbersPromises);

      // Create sets for fast lookups
      const receivedSet = new Set(receivedPhoneNumbers);
      const sentSet = new Set(sentPhoneNumbers);

      // Filter out contacts already in the friend list and assign status
      userContactsCopy = userContactsCopy
        .filter(
          (contact) => !friendListPhoneNumbers.includes(contact.phoneNumber)
        )
        .map((contact) => {
          if (receivedSet.has(contact.phoneNumber)) {
            contact.status = "received";
          } else if (sentSet.has(contact.phoneNumber)) {
            contact.status = "sent";
          } else {
            contact.status = "add";
          }
          return contact;
        });

      setContacts(userContactsCopy);
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
