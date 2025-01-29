import { Alert } from "react-native";

const CustomAlert = ({ title, message, cancelText, acceptText, onAccept }) => {
  const showAlert = () => {
    Alert.alert(
      title || "Alert",
      message || "Are you sure?",
      [
        { text: cancelText || "Cancel", style: "cancel" },
        { text: acceptText || "OK", onPress: onAccept },
      ]
    );
  };

  return { showAlert };
};

export default CustomAlert;
