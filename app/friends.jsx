import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import ScrubLogo from "@/components/scrubLogo";
import Friend from "@/components/friend";
import { savedStyles, theme } from "@/theme";
import NumberInput from "@/components/numberInput";
import DropDownButton from "@/components/dropDownButton";
import CountryPickerModal from "@/components/countryPickerModal";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import avatar1 from "@/assets/avatar1.png";
import avatar2 from "@/assets/avatar2.png";
import avatar3 from "@/assets/avatar3.png";
import avatar4 from "@/assets/avatar4.png";
import avatar5 from "@/assets/avatar5.png";
import avatar6 from "@/assets/avatar6.png";
import avatar7 from "@/assets/avatar7.png";
import avatar0 from "@/assets/avatar0.png";

/* TODO:
Mechanism to remove friend, see requests.
Design friend reqest sent  modal properly! setInviteSent(true)
mechanism for accesspt/delete/view Requests.

*/

export default function Friends() {
  const [active, setActive] = useState("friends");
  const [dropDownActive, setDropDownActive] = useState(false);

  const [friends, setFriends] = useState([]); // State to hold friends list
  const [loadingFriends, setLoadingFriends] = useState(false); // State to handle loading

  const [myPhoneNumber, setMyPhoneNumber] = useState(""); // State to hold my Phone
  const [myUid, setMyUid] = useState(""); // State to hold my Phone
  const [phoneNumber, setPhoneNumber] = useState(""); // State to hold friends phone

  const [inviteSent, setInviteSent] = useState(false);

  const [countryCode, setCountryCode] = useState("+92");

  //For testing Purpose only!
  // const uid1 = "FrTsL0JPgZaBSMvPoGHErIpU1iz2";
  // const uid2 = "Nqs82Okhs5U6tPgmWgNCwBfZGa32";
  // const uid3 = "DQEwsxt5K7g0k95FN7Y6oqGMeAr2";
  // const myPhoneNumber = "+921111111111";
  // const myPhoneNumber = "+922222222222";
  // const myPhoneNumber = "+923333333333";

  // const uid = uid3;

  const sendInvite = async () => {
    if (phoneNumber.length != 10) {
      Alert.alert("Error", "Please enter a valid phone number.");
      return;
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    try {
      // 1. Validate phone number is not the user's own number(success)
      if (fullPhoneNumber === myPhoneNumber) {
        Alert.alert("Error", "You cannot add yourself!");
        return;
      }

      // 2. Search for the user with the given phone number(success)
      const querySnapshot = await firestore()
        .collection("Users")
        .where("phoneNumber", "==", fullPhoneNumber)
        .get();

      if (querySnapshot.empty) {
        Alert.alert("Error", "User with this phone number not found!");
        return;
      }

      const targetUserDoc = querySnapshot.docs[0];
      const targetUid = targetUserDoc.id;

      // 3. Fetch the user's friend list
      const userDoc = await firestore().collection("Users").doc(myUid).get();
      const userData = userDoc.data();

      const friendList = userData.friendList || [];
      const friendRequestsSent = userData.friendRequestsSent || [];
      const friendRequestsReceived = userData.friendRequestsReceived || [];

      // 4. Check if the target user is already a friend(success)
      if (friendList.includes(targetUid)) {
        Alert.alert("Error", "This user is already your friend!");
        return;
      }

      // 5. Check if a friend request was already sent(success)
      if (friendRequestsSent.includes(targetUid)) {
        Alert.alert("Error", "Friend request already sent!");
        return;
      }

      // 6. Check if there is a received request from the target user(success)
      if (friendRequestsReceived.includes(targetUid)) {
        // Add the target user to the friend list
        await firestore()
          .collection("Users")
          .doc(myUid)
          .update({
            friendList: firestore.FieldValue.arrayUnion(targetUid),
            friendRequestsReceived: firestore.FieldValue.arrayRemove(targetUid),
          });

        // Update the target user's data
        await firestore()
          .collection("Users")
          .doc(targetUid)
          .update({
            friendList: firestore.FieldValue.arrayUnion(myUid),
            friendRequestsSent: firestore.FieldValue.arrayRemove(myUid),
          });

        Alert.alert("Success", "Friend request accepted!");
        setInviteSent(true);
      } else {
        // 7. Send a new friend request(success)
        await firestore()
          .collection("Users")
          .doc(myUid)
          .update({
            friendRequestsSent: firestore.FieldValue.arrayUnion(targetUid),
          });

        await firestore()
          .collection("Users")
          .doc(targetUid)
          .update({
            friendRequestsReceived: firestore.FieldValue.arrayUnion(myUid),
          });

        setPhoneNumber("");
        Alert.alert("Success", "Friend request sent!");
        setInviteSent(true);
      }
    } catch (error) {
      console.error("Error sending invite:", error);
      Alert.alert("Error", "An error occurred while sending the invite.");
    }
  };

  const fetchFriends = async () => {
    try {
      setLoadingFriends(true);
      const currentUserId = auth().currentUser?.uid;

      if (!currentUserId) {
        throw new Error("User not authenticated");
      }

      setMyUid(currentUserId);

      const userDoc = await firestore()
        .collection("Users")
        .doc(currentUserId)
        .get();

      if (!userDoc.exists) {
        throw new Error("User document does not exist");
      }

      setMyPhoneNumber(userDoc.data().phoneNumber);

      const friendsList = userDoc.data()?.friendList || [];

      if (friendsList.length === 0) {
        console.log("No friends found");
        setFriends([]);
        setLoadingFriends(false); // Ensure loading state is updated here if no friends found
        return;
      }

      try {
        const friendsDetails = await Promise.all(
          friendsList.map(async (friendId) => {
            const friendDoc = await firestore()
              .collection("Users")
              .doc(friendId)
              .get();
            return { id: friendId, ...friendDoc.data() };
          }),
        );

        setFriends(friendsDetails);
      } catch (error) {
        console.error("Error fetching friends' details:", error);
        setFriends([]); // Optional: Reset friends if fetching details fails
        Alert.alert(
          "Error",
          "Unable to fetch some friends' details. Please try again later.",
        );
      } finally {
        setLoadingFriends(false); // Ensure loading state is updated after all async calls
      }
    } catch (error) {
      console.error("Error fetching friends:", error);
      setLoadingFriends(false);
      Alert.alert("Error", "Unable to fetch friends. Please try again later.");
    }
  };

  useEffect(() => {
    if (active === "friends") {
      fetchFriends(); // Fetch friends when the "My Friends" tab is active
    }
  }, [active]);

  // const sendInviteInstructions = async()=>{
  //   /*
  //   1)take phone number
  //   1.1) check that it is not  equal to ur own number if so the alert that you cannot add yourself!
  //   2)search in users whose number is it?
  //   3)if number not exist SHOW ERROR alert that user with ph num not found!
  //   4)if num exists, then fetch friendList and check that number should not be in that list. If it does then alert that number is already your friend
  //   5)if it does not exist there then check the number not in friendRequestsSent, if exist then say request already sent, if not then check friendRequestsReceived if it's there then add the number to friendList, remove it from friendRequestsReceived, and on reciever's end remove it from friendRequestsSend and add it to their friendList aswell
  //   6)if it's not in friendRequestsReceived, then simply add it to friendRequestsSend to ours and friendRequestsReceived to theirs.

  //   Please just add/remove uid's not actual phone numbers.
  //   My firebase schema look like Users(collection)->uid(document id)->fields.
  //   fields such as friendRequestsReceived might not be present initially
  //   use "@react-native-firebase/firestore

  //   */

  //   try{
  //     if(phoneNumber==myPhoneNumber){
  //       Alert.alert('Error', 'You cannot add yourself!')
  //       return
  //     }
  //     const db = getFirestore();
  //     const userDocRef = doc(db, "Users", uid);

  //   }catch{
  //     console.error('Error sending invite:', error);
  //     Alert.alert('Error', 'An error occurred while sending the invite.');
  //   }
  // }

  const getAvatarImage = (avatarId) => {
    switch (avatarId) {
      case 1:
        return avatar1;
      case 2:
        return avatar2;
      case 3:
        return avatar3;
      case 4:
        return avatar4;
      case 5:
        return avatar5;
      case 6:
        return avatar6;
      case 7:
        return avatar7;
      default:
        return avatar0; // Default avatar if no match is found
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackButton />
      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <ScrubLogo />
          {/* Tabs */}
          <View style={styles.tabs}>
            <Pressable onPress={() => setActive("friends")}>
              <Text
                style={[
                  styles.tabHeader,
                  active === "friends" ? styles.current : styles.inactive,
                ]}
              >
                My Friends
              </Text>
            </Pressable>
            <Pressable onPress={() => setActive("invite")}>
              <Text
                style={[
                  styles.tabHeader,
                  active === "invite" ? styles.current : styles.inactive,
                ]}
              >
                Invite Friend
              </Text>
            </Pressable>
          </View>
          <View style={styles.tabDivider}>
            <View style={styles.fullUnderline}></View>
            <View
              style={[
                styles.activeUnderline,
                active === "friends" && { left: "16%" },
                active === "invite" && { left: "57%" },
              ]}
            ></View>
          </View>

          {/* Tabs Content */}
          {active === "friends" ? (
            <ScrollView style={styles.friendContainer}>
              {loadingFriends ? (
                <ActivityIndicator
                  style={styles.loadingIndicator}
                  size={"large"}
                  color={"blue"}
                />
              ) : friends.length > 0 ? (
                friends.map((friend, index) => (
                  <Friend
                    key={friend.uid}
                    Name={friend.username || "Unknown"}
                    photoUrl={
                      friend.avatarId
                        ? getAvatarImage(friend.avatarId)
                        : getAvatarImage(0)
                    }
                  />
                ))
              ) : (
                <Text style={styles.noFriendsText}>
                  It seems you're flying solo. Add some friends and make it more
                  fun!
                </Text>
              )}
            </ScrollView>
          ) : (
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.inviteFriendContainer}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                  <View style={styles.titleinviteFriend}>
                    <Text style={styles.titleText}>
                      Share the Scrub Hub Experience - Invite Today!
                    </Text>
                    <Text style={styles.subtitleText}>
                      Enter your Friend's Mobile Number
                    </Text>
                  </View>
                  <View style={savedStyles.numberinviteFriend}>
                    {/* Dropdown */}
                    <DropDownButton
                      setDropDownActive={setDropDownActive}
                      countryCode={countryCode}
                    />
                    {/* Phone Input */}
                    <View style={{ flex: 1 }}>
                      <NumberInput
                        placeholderTextColor={"black"}
                        bgColor="rgba(0,0,0,0.2)"
                        color={"black"}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                      />
                    </View>
                  </View>
                  <TouchableOpacity style={styles.inviteButton}>
                    <Text
                      style={styles.inviteButtonText}
                      // onPress={() => setInviteSent(true)}
                      onPress={sendInvite}
                    >
                      Send Invite
                    </Text>
                  </TouchableOpacity>

                  {/* Dropdown Modal */}
                  <CountryPickerModal
                    setCountryCode={setCountryCode}
                    setDropDownActive={setDropDownActive}
                    dropDownActive={dropDownActive}
                  />
                  {/* {InviteSentModal} */}

                  <Modal
                    visible={inviteSent}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setInviteSent(false)}
                  >
                    <TouchableOpacity
                      style={styles.overlay}
                      onPress={() => setInviteSent(false)}
                      activeOpacity={1}
                    >
                      <View style={styles.modalContainer}>
                        {/* Circle with shadow */}
                        <View style={styles.iconCircle}>
                          <Image
                            source={require("@/assets/invitationSuccess.png")}
                            style={styles.icon}
                            resizeMode="contain"
                          />
                        </View>

                        {/* Title */}
                        <Text style={styles.title}>
                          Invitation Sent Successfully!
                        </Text>

                        {/* Description */}
                        <Text style={styles.description}>
                          Your invite is on its way! Let your friend join the
                          Scrub Hub fun and start exploring.
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Modal>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          )}
        </BackgroundImage>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  tabHeader: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  current: { color: "blue", fontWeight: "bold" },
  inactive: { color: "#ADADAD" },
  tabDivider: {
    position: "relative",
    height: 10,
    justifyContent: "center",
  },
  fullUnderline: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 6,
    backgroundColor: "blue",
  },
  activeUnderline: {
    position: "absolute",
    bottom: 2,
    width: "25%",
    height: 2,
    backgroundColor: "white",
    zIndex: 1,
  },
  friendContainer: { flex: 1, marginTop: 15 },
  inviteFriendContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  titleinviteFriend: { alignItems: "center", marginBottom: 15 },
  titleText: { fontSize: 18, textAlign: "center", fontWeight: "bold" },
  subtitleText: { marginVertical: 15 },
  numberinviteFriend: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginBottom: 20,
  },

  inviteButton: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 5,
  },
  inviteButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  noFriendsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  loadingIndicator: {
    marginTop: 150,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darker background overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 40,
    padding: 30,
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10, // For Android shadow
  },
  iconCircle: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6, // Shadow for the circle
  },
  icon: {
    width: 60,
    height: 60,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
});
