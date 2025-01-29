import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomAlert from "./CustomAlert";

const ContactItem = ({ contact }) => {
    const {showAlert:sendRequestAlert} = CustomAlert({
        title: "Add Friend",
        message: "Are you sure you want to add this user?",
        cancelText: "No",
        acceptText: "Yes",
        onAccept: () => console.log("friend Added"),
      });

    const {showAlert:acceptRequestAlert} = CustomAlert({
        title: "Accept Friend Request",
        message: "Are you sure you want to accept this friend request?",
        cancelText: "No",
        acceptText: "Yes",
        onAccept: () => console.log("friend request accepted"),
      });

    const {showAlert:cancelRequestAlert} = CustomAlert({
        title: "Delete Friend Request",
        message: "Are you sure you want to delete this friend request?",
        cancelText: "No",
        acceptText: "Yes",
        onAccept: () => console.log("friend request deleted"),
      });

    const {showAlert:sendInvitationAlert} = CustomAlert({
        title: "Send Invitation",
        message: "Are you sure you want to send an invite?",
        cancelText: "No",
        acceptText: "Yes",
        onAccept: () => console.log("invite sent"),
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

  const handleAction = (contact) => {
    if(contact.status === "invite") {
        sendInvitationAlert();
    }
    else if(contact.status === "received") {
        acceptRequestAlert();
    }
    else if(contact.status === "sent") {
        cancelRequestAlert();
    }
    else {
        sendRequestAlert();
    }
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
        onPress={() => handleAction(contact)}
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
