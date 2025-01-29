import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import useCurrentUserStore from "@/store/currentUserStore";
import BackButton from "@/components/backButton";
import BackgroundImage from "@/components/backgroundImage";
import ScrubLogo from "@/components/scrubLogo";
import { Redirect } from "expo-router";
import useGetUserContacts from "@/hooks/useGetUserContacts";

const UserContacts = () => {
  const [userContacts, setUserContacts] = useState([]);
  const { loading, contacts: finalContacts } = useGetUserContacts({userContacts});
  const [permissionDenied, setPermissionDenied] = useState(false);

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
              lastName: contact.lastName,
              phoneNumber: contact.phoneNumbers[0]?.number,
            }));
          setUserContacts(filteredContacts.slice(0, 10));
        }
      } else {
        console.log("Permission denied");
        setPermissionDenied(true);
      }
    })();
  }, []);

  console.log(loading);
  console.log(finalContacts);

  if (permissionDenied) {
    return <Redirect href="friends"/>;
  }

  return (
    <View className="flex-1">
      <BackButton />
      <BackgroundImage>
        <ScrubLogo />
        <Text className="font-extrabold text-red-800 text-4xl">
          UserContacts
        </Text>
      </BackgroundImage>
    </View>
  );
};

export default UserContacts;
