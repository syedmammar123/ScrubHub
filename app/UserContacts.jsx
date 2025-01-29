import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Contacts from "expo-contacts";

const UserContacts = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const filteredContacts = data
            .filter(
              (contact) => contact.firstName && contact.phoneNumbers?.length
            )
            .map((contact) => ({
              firstName: contact.firstName,
              phoneNumber: contact.phoneNumbers[0]?.number,
            }));

          console.log(filteredContacts[0]);
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView>
      <Text className="font-extrabold text-red-800 text-4xl">UserContacts</Text>
    </SafeAreaView>
  );
};

export default UserContacts;
