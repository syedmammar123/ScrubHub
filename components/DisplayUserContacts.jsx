import React from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomAlert from "./CustomAlert";
import useAcceptRequest from "@/hooks/useAcceptRequest";
import useSendRequest from "@/hooks/useSendRequest";
import useCancelRequest from "@/hooks/useCancelRequest";
import * as SMS from "expo-sms";
import CustomText from "./CustomText";

const statusColors = {
  invite: "bg-blue-500",
  received: "bg-green-500",
  sent: "bg-red-500",
  add: "bg-yellow-500",
};

const statusIcon = {
  received: "check",
  sent: "cross",
  add: "add-user",
};

const DisplayUserContacts = ({ contacts }) => {
  return (
    <ScrollView className="p-4 pt-2 mb-4">
      {contacts.map((contact,index) => (
        <ContactItem key={`${contact.phoneNumber}-${index}`}  contact={contact} />
      ))}
    </ScrollView>
  );
};

export default DisplayUserContacts;

function AcceptRequestBtn({ status, itemId }) {
  const { handleAcceptRequest, loading } = useAcceptRequest();

  const { showAlert: acceptRequestAlert } = CustomAlert({
    title: "Accept Friend Request",
    message: "Are you sure you want to accept this friend request?",
    cancelText: "No",
    acceptText: "Yes",
    onAccept: (uuid) => handleAcceptRequest(uuid),
  });

  return (
    <TouchableOpacity
      className={`py-2 px-4 rounded-full ${statusColors[status]}`}
      onPress={() => acceptRequestAlert(itemId)}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Entypo name={statusIcon[status]} size={24} color="white" />
      )}
    </TouchableOpacity>
  );
}

function SendRequestBtn({ status, itemId }) {
  const { loading, handleSendRequest } = useSendRequest();

  const { showAlert: sendRequestAlert } = CustomAlert({
    title: "Add Friend",
    message: "Are you sure you want to add this user?",
    cancelText: "No",
    acceptText: "Yes",
    onAccept: (uuid) => handleSendRequest(uuid),
  });

  return (
    <TouchableOpacity
      className={`py-2 px-4 rounded-full ${statusColors[status]}`}
      onPress={() => sendRequestAlert(itemId)}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Entypo name={statusIcon[status]} size={24} color="white" />
      )}
    </TouchableOpacity>
  );
}

function CancelRequestBtn({ status, itemId }) {
  const { loading, handleCancelRequest } = useCancelRequest();

  const { showAlert: cancelRequestAlert } = CustomAlert({
    title: "Delete Friend Request",
    message: "Are you sure you want to delete this friend request?",
    cancelText: "No",
    acceptText: "Yes",
    onAccept: (uuid) => handleCancelRequest(uuid),
  });

  return (
    <TouchableOpacity
      className={`py-2 px-4 rounded-full ${statusColors[status]}`}
      onPress={() => cancelRequestAlert(itemId)}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Entypo name={statusIcon[status]} size={24} color="white" />
      )}
    </TouchableOpacity>
  );
}

function SendInvitationBtn({ status, itemId, phoneNumber }) {
  const { showAlert: sendInvitationAlert } = CustomAlert({
    title: "Send Invitation",
    message: "Are you sure you want to send an invite?",
    cancelText: "No",
    acceptText: "Yes",
    onAccept: () => handleSendSms(),
  });

  const handleSendSms = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        [phoneNumber],
        "Hello, I am inviting you to join my app!",
      );
      console.log(result);
    } else {
      console.log("SMS is not available on this device");
    }
  };

  return (
    <TouchableOpacity
      className={`py-2 px-4 rounded-full ${statusColors[status]}`}
      onPress={() => sendInvitationAlert()}
    >
      <FontAwesome name="send" size={24} color="white" />
    </TouchableOpacity>
  );
}

function ContactItem({ contact }) {
  return (
    <View className="flex-row items-center p-4 border-b border-gray-300">
      <View className="flex-1">
        <CustomText className="text-lg font-bold text-gray-900">
          {contact.firstName} {contact.lastName || ""}
        </CustomText>
        <CustomText className="text-gray-600">{contact.phoneNumber}</CustomText>
      </View>
      {contact.status === "invite" && (
        <SendInvitationBtn
          status="invite"
          itemId={contact.uuid}
          phoneNumber={contact.phoneNumber}
        />
      )}
      {contact.status === "received" && (
        <AcceptRequestBtn status="received" itemId={contact.uuid} />
      )}
      {contact.status === "sent" && (
        <CancelRequestBtn status="sent" itemId={contact.uuid} />
      )}
      {contact.status === "add" && (
        <SendRequestBtn status="add" itemId={contact.uuid} />
      )}
    </View>
  );
}
