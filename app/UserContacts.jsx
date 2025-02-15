import { View, Text, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import useCurrentUserStore from "@/store/currentUserStore";
import BackButton from "@/components/backButton";
import BackgroundImage from "@/components/backgroundImage";
import ScrubLogo from "@/components/scrubLogo";
import useGetUserContacts from "@/hooks/useGetUserContacts";
import {
  formatPhoneNumber,
  getCountryFromPhoneNumber,
} from "@/util/getRandomItem";
import DisplayUserContacts from "@/components/DisplayUserContacts";
import CustomText from "@/components/CustomText";

const UserContacts = () => {
  const { user } = useCurrentUserStore((state) => state);
  const [userContacts, setUserContacts] = useState([]);
  const {
    loading,
    contacts: finalContacts,
    error,
  } = useGetUserContacts({
    userContacts,
  });
  const [permissionDenied, setPermissionDenied] = useState(false);

  const requestContactsPermission = useCallback(async () => {
    if (!user || !user.phoneNumber) {
      console.error("User or phoneNumber is undefined");
      return;
    }
    
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const country = getCountryFromPhoneNumber(user.phoneNumber) || "US";
        console.log("country: ", country);
        const filteredContacts = data
          .filter(
            (contact) => contact.firstName && contact.phoneNumbers?.length,
          )
          .map((contact) => ({
            firstName: contact.firstName,
            lastName: contact.lastName,
            phoneNumber: formatPhoneNumber(
              contact.phoneNumbers?.[0]?.number || "",
              country,
            ),
          }));
          console.log(filteredContacts.length);
          
        setUserContacts(filteredContacts);
      }
    } else {
      console.log("Permission denied");
      setPermissionDenied(true);
    }
  }, [user?.phoneNumber]);

  useEffect(() => {
    requestContactsPermission();
  }, [requestContactsPermission]);

  return (
    <View className="flex-1">
      <BackButton />
      <BackgroundImage>
        <ScrubLogo type={null} />
        <View className="flex-1 items-center justify-center">
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {error && (
            <CustomText className="font-semibold text-center">
              Error fetching contacts
            </CustomText>
          )}
          {permissionDenied && (
            <CustomText className="font-semibold text-center">
              Permission Denied. Goto Settings and allow ScrubHub to access your
              contacts.
            </CustomText>
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
