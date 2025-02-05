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
    setLoading(true);
    try {
      const currentUserId = user?.uid;
      if (!currentUserId) throw new Error("User not authenticated");
  
      console.log(user);
  
      const myDocRef = firestore().collection("Users").doc(currentUserId);
      const doc = await myDocRef.get();
      if (!doc.exists) throw new Error("User not found");
  
      const friendList = doc.data().friendList ?? [];
      const friendRequestsReceived = doc.data().friendRequestsReceived ?? [];
      const friendRequestsSent = doc.data().friendRequestsSent ?? [];
  
      let userContactsCopy = [...userContacts];
  
      // Store promises for parallel execution
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
            .catch(() => []) // Handle empty result
        );
      } else {
        phoneNumbersPromises.push(Promise.resolve([]));
      }
  
      if (friendRequestsReceived.length > 0) {
        phoneNumbersPromises.push(
          firestore()
            .collection("Users")
            .where("uid", "in", friendRequestsReceived)
            .get()
            .then((receivedUsers) =>
              receivedUsers.docs.map((doc) => ({
                phoneNumber: doc.data().phoneNumber,
                uid: doc.id,
              }))
            )
            .catch(() => [])
        );
      } else {
        phoneNumbersPromises.push(Promise.resolve([]));
      }
  
      if (friendRequestsSent.length > 0) {
        phoneNumbersPromises.push(
          firestore()
            .collection("Users")
            .where("uid", "in", friendRequestsSent)
            .get()
            .then((sentUsers) =>
              sentUsers.docs.map((doc) => ({
                phoneNumber: doc.data().phoneNumber,
                uid: doc.id,
              }))
            )
            .catch(() => [])
        );
      } else {
        phoneNumbersPromises.push(Promise.resolve([]));
      }
  
      phoneNumbersPromises.push(
        firestore()
          .collection("Users")
          .get()
          .then((allUsers) =>
            allUsers.docs.map((doc) => ({
              phoneNumber: doc.data().phoneNumber,
              uid: doc.id,
            }))
          )
          .catch(() => [])
      );
  
      // Wait for all promises to resolve
      const [
        friendListPhoneNumbers = [],
        receivedPhoneNumbers = [],
        sentPhoneNumbers = [],
        allUserPhoneNumbers = [],
      ] = await Promise.all(phoneNumbersPromises);
  
      // Create sets for fast lookups
      const receivedSet = new Set(receivedPhoneNumbers.map((user) => user.phoneNumber));
      const sentSet = new Set(sentPhoneNumbers.map((user) => user.phoneNumber));
      const allUserSet = new Set(allUserPhoneNumbers.map((user) => user.phoneNumber));
  
      // Filter out contacts already in the friend list and assign status
      userContactsCopy = userContactsCopy
        .filter((contact) => !friendListPhoneNumbers.includes(contact.phoneNumber))
        .map((contact) => {
          let status = "invite";
          if (receivedSet.has(contact.phoneNumber)) {
            status = "received";
          } else if (sentSet.has(contact.phoneNumber)) {
            status = "sent";
          } else if (allUserSet.has(contact.phoneNumber)) {
            status = "add";
          }
  
          // Find the UUID for the phone number
          const userUuid = allUserPhoneNumbers.find(
            (user) => user.phoneNumber === contact.phoneNumber
          )?.uid;
  
          return {
            phoneNumber: contact.phoneNumber,
            uuid: userUuid, // add uuid
            firstName: contact.firstName,
            lastName: contact.lastName,
            status: status,
          };
        });
  
      setContacts(userContactsCopy);
    } catch (error) {
      console.error("Error fetching Contacts: ", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (userContacts.length === 0) return; // No need to fetch contacts if there are none
    getUserContacts();
  }, [userContacts, user]);

  return { contacts, loading, error };
};

export default useGetUserContacts;
