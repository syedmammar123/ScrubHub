import { Alert } from "react-native";

const CustomAlert = ({ title, message, cancelText, acceptText, onAccept }) => {


  const showAlert = (uuid) => {
    Alert.alert(
      title || "Alert",
      message || "Are you sure?",
      [
        { text: cancelText || "Cancel", style: "cancel" },
        { text: acceptText || "OK", onPress: () => onAccept(uuid) },
      ]
    );
  };

  return { showAlert };
};

export default CustomAlert;
