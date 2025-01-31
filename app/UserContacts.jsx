import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import useCurrentUserStore from "@/store/currentUserStore";
import BackButton from "@/components/backButton";
import BackgroundImage from "@/components/backgroundImage";
import ScrubLogo from "@/components/scrubLogo";
import { Redirect } from "expo-router";
import useGetUserContacts from "@/hooks/useGetUserContacts";
import { formatPhoneNumber } from "@/util/getRandomItem";
import DisplayUserContacts from "@/components/DisplayUserContacts";

const UserContacts = () => {
  const [userContacts, setUserContacts] = useState([]);
  const {
    loading,
    contacts: finalContacts,
    error,
  } = useGetUserContacts({
    userContacts,
  });
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    const requestContactsPermission = async () => {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const filteredContacts = data
            .filter(
              (contact) => contact.firstName && contact.phoneNumbers?.length,
            )
            .map((contact) => ({
              firstName: contact.firstName,
              lastName: contact.lastName,
              phoneNumber: formatPhoneNumber(contact.phoneNumbers[0]?.number),
            }));
          setUserContacts(filteredContacts.slice(0, 10));
        }
      } else {
        console.log("Permission denied");
        setPermissionDenied(true);
      }
    };

    requestContactsPermission();
  }, []);

  console.log(loading);
  console.log("contacts: ", finalContacts);

  return (
    <View className="flex-1">
      <BackButton />
      <BackgroundImage>
        <ScrubLogo />
        <View className="flex-1 items-center justify-center">
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {error && (
            <Text className="font-semibold text-center">
              Error fetching contacts
            </Text>
          )}
          {permissionDenied && (
            <Text className="font-semibold text-center">
              Permission Denied. Goto Settings and allow ScrubHub to access your
              contacts.
            </Text>
          )}
        </View>
        {finalContacts.length > 0 && (
          <DisplayUserContacts contacts={finalContacts} />
        )}
      </BackgroundImage>
    </View>
  );
};

export default UserContacts;
