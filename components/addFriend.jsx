import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomText from "./CustomText";

const AddFriend = ({ setShowInvitation, count }) => {
  const handlePress = () => {
    setShowInvitation(true);
  };
  return (
    <TouchableOpacity style={styles.buttonCircleStyle} onPress={handlePress}>
      <Ionicons name="person-add" size={18} color="black" />
      {count > 0 && <CustomText style={styles.count}>{count}</CustomText>}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonCircleStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -20,
    zIndex: 1,
    width: 30,
    height: 30,
    marginTop: 60,
    borderRadius: 15,
    backgroundColor: "#F6F6F7",
    alignSelf: "flex-start",
    marginRight: 25,
    marginBottom: 10,
    position: "relative",
  },
  count: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    color: "white",
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: "center",
    fontSize: 12,
  },
});
export default AddFriend;
