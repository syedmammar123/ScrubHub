import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomAlert from "./CustomAlert";

const ContactItem = ({ contact }) => {
    const {showAlert} = CustomAlert({
        title: "Delete Item",
        message: "Are you sure you want to delete this?",
        cancelText: "No",
        acceptText: "Yes",
        onAccept: () => console.log("Item deleted"),
      });
  const statusColors = {
    invite: "bg-blue-500",
    received: "bg-green-500",
    sent: "bg-red-500",
    add: "bg-yellow-500",
  };

  const statusIcon = {
    received: "check",
    sent: "cross",
    add:"add-user"
  };

  const handleSentInvite = () => {
    showAlert();
  }

  return (
    <View className="flex-row items-center p-4 border-b border-gray-300">
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-900">
          {contact.firstName} {contact.lastName || ""}
        </Text>
        <Text className="text-gray-600">{contact.phoneNumber}</Text>
      </View>
      <TouchableOpacity
        className={`py-2 px-4 w-32 rounded-full ${statusColors[contact.status]}`}
        onPress={handleSentInvite}
      >{
        contact.status === "invite" ?
        <FontAwesome name="send" size={24} color="white" /> :
        <Entypo name={statusIcon[contact.status]} size={24} color="white" />
      }
      </TouchableOpacity>
    </View>
  );
};

const DisplayUserContacts = ({ contacts }) => {
  return (
    <ScrollView className="p-4 pt-2 mb-4">
      {contacts.map((contact) => (
        <ContactItem key={contact.phoneNumber} contact={contact} />
      ))}
    </ScrollView>
  );
};

export default DisplayUserContacts;
