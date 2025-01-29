import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import useCurrentUserStore from "@/store/currentUserStore";

const useGetUserContacts = ({ userContacts }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user } = useCurrentUserStore((state) => state);

  const getUserContacts = async () => {
    setError(false);
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

      phoneNumbersPromises.push(
        firestore()
          .collection("Users")
          .get()
          .then((user) => {
            return user.docs[0].data().phoneNumber;
          })
      );

      // Execute all Firestore queries simultaneously
      const [
        friendListPhoneNumbers,
        receivedPhoneNumbers,
        sentPhoneNumbers,
        allUserPhoneNumbers,
      ] = await Promise.all(phoneNumbersPromises);

      // Create sets for fast lookups
      const receivedSet = new Set(receivedPhoneNumbers);
      const sentSet = new Set(sentPhoneNumbers);
      const allUserSet = new Set(allUserPhoneNumbers);

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
          } else if (allUserSet.has(contact.phoneNumber)) {
            contact.status = "add";
          } else {
            contact.status = "invite";
          }
          return contact;
        });

      setContacts(userContactsCopy);
    } catch (error) {
      console.log("Error fetching Contacts: ", error);
        setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userContacts.length === 0) return; // No need to fetch contacts if there are none
    // getUserContacts();
  }, [userContacts]);

  return { contacts, loading,error };
};

export default useGetUserContacts;
