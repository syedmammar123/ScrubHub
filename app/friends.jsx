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

import AddFriend from "@/components/addFriend";
import SlideUpView from "@/components/SlideUpView";
import useGetInvitations from "@/hooks/useGetInvitations";
import leaderBoardImg from "@/assets/leaderboard.png";
import { useLocalSearchParams, useRouter } from "expo-router";
import useAddNotification from "@/hooks/useAddNotification";
import CustomText from "@/components/CustomText";
import useQuesStore from "@/store/quesStore";
import { q } from "@/store/quesData";
import { getQuestionType } from "@/util/utilQuesFunc";
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

  const [showInvitation, setShowInvitation] = useState(false);
  const { invitations, invitationsLoading, setInvitations } =
    useGetInvitations();

  const [sendInviteLoading, setSendInviteLoading] = useState(false);

  const { addFriendRequestNotification, acceptFriendRequestNotification } =
    useAddNotification();

  const { openFriendRequests } = useLocalSearchParams();

  const router = useRouter();

  const {
    fetchChallengingFriendsQuestions,
    getFriendChallengeQuestion,
    getFetchedFriendChallengeID,
    setType,
    clearFields,
    clearFields2,
  } = useQuesStore((state) => state);
  const sendInvite = async () => {
    if (phoneNumber.length !== 10) {
      Alert.alert("Error", "Please enter a valid phone number.");
      return;
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    try {
      setSendInviteLoading(true);
      const batch = firestore().batch(); // Create batch

      if (fullPhoneNumber === myPhoneNumber) {
        Alert.alert("Error", "You cannot add yourself!");
        return;
      }

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

      const userDoc = await firestore().collection("Users").doc(myUid).get();
      const userData = userDoc.data();

      const friendList = userData.friendList || [];
      const friendRequestsSent = userData.friendRequestsSent || [];
      const friendRequestsReceived = userData.friendRequestsReceived || [];

      if (friendList.includes(targetUid)) {
        Alert.alert("Error", "This user is already your friend!");
        return;
      }

      if (friendRequestsSent.includes(targetUid)) {
        Alert.alert("Error", "Friend request already sent!");
        return;
      }

      if (friendRequestsReceived.includes(targetUid)) {
        // Accept friend request
        const userRef = firestore().collection("Users").doc(myUid);
        const targetUserRef = firestore().collection("Users").doc(targetUid);

        batch.update(userRef, {
          friendList: firestore.FieldValue.arrayUnion(targetUid),
          friendRequestsReceived: firestore.FieldValue.arrayRemove(targetUid),
        });

        batch.update(targetUserRef, {
          friendList: firestore.FieldValue.arrayUnion(myUid),
          friendRequestsSent: firestore.FieldValue.arrayRemove(myUid),
        });

        acceptFriendRequestNotification(batch, targetUid);
        setInviteSent(true);
      } else {
        // Send friend request
        const userRef = firestore().collection("Users").doc(myUid);
        const targetUserRef = firestore().collection("Users").doc(targetUid);

        batch.update(userRef, {
          friendRequestsSent: firestore.FieldValue.arrayUnion(targetUid),
        });

        batch.update(targetUserRef, {
          friendRequestsReceived: firestore.FieldValue.arrayUnion(myUid),
        });

        addFriendRequestNotification(batch, targetUid);

        setPhoneNumber("");
        setInviteSent(true);
      }

      await batch.commit(); // Commit batch
    } catch (error) {
      console.error("Error sending invite:", error);
      Alert.alert("Error", "An error occurred while sending the invite.");
    } finally {
      setSendInviteLoading(false);
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
          })
        );

        setFriends(friendsDetails);
      } catch (error) {
        console.error("Error fetching friends' details:", error);
        setFriends([]); // Optional: Reset friends if fetching details fails
        Alert.alert(
          "Error",
          "Unable to fetch some friends' details. Please try again later."
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

  useEffect(() => {
    if (openFriendRequests) {
      setShowInvitation(true);
    }
  }, []);

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

  const handleAcceptRequest = async (itemId) => {
    try {
      const batch = firestore().batch();

      // Reference to the current user's document
      const myDoc = firestore().collection("Users").doc(myUid);

      // Reference to the target user's document
      const theirDoc = firestore().collection("Users").doc(itemId);

      // Update the current user's data
      batch.update(myDoc, {
        friendList: firestore.FieldValue.arrayUnion(itemId), // Add to friend list
        friendRequestsReceived: firestore.FieldValue.arrayRemove(itemId), // Remove from received requests
      });

      // Update the target user's data
      batch.update(theirDoc, {
        friendList: firestore.FieldValue.arrayUnion(myUid), // Add to friend list
        friendRequestsSent: firestore.FieldValue.arrayRemove(myUid), // Remove from sent requests
      });

      // Commit the batch operation
      acceptFriendRequestNotification(batch, itemId);

      await batch.commit();

      Alert.alert("Success", "Friend request accepted successfully!");
      setInvitations(
        invitations.filter((invitation) => invitation.uid !== itemId)
      );
      fetchFriends();
    } catch (error) {
      console.error("Error accepting friend request:", error);
      Alert.alert(
        "Error",
        "An error occurred while accepting the friend request."
      );
    }
  };

  const handleRejectRequest = async (itemId) => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to reject this friend request?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reject",
          onPress: async () => {
            try {
              const batch = firestore().batch();

              // Reference to the current user's document
              const myDoc = firestore().collection("Users").doc(myUid);

              // Reference to the target user's document
              const theirDoc = firestore().collection("Users").doc(itemId);

              // Update the current user's friendRequestsReceived
              batch.update(myDoc, {
                friendRequestsReceived:
                  firestore.FieldValue.arrayRemove(itemId),
              });

              // Update the target user's friendRequestsSent
              batch.update(theirDoc, {
                friendRequestsSent: firestore.FieldValue.arrayRemove(myUid),
              });

              // Commit the batch operation
              await batch.commit();

              Alert.alert("Success", "Friend request rejected successfully!");
              setInvitations(
                invitations.filter((invitation) => invitation.uid !== itemId)
              );
            } catch (error) {
              console.error("Error rejecting friend request:", error);
              Alert.alert(
                "Error",
                "An error occurred while rejecting the friend request."
              );
            }
          },
        },
      ]
    );
  };

  const handleRemoveFriend = async (itemId) => {
    Alert.alert("Confirm", "Are you sure you want to remove this friend?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        onPress: async () => {
          try {
            const batch = firestore().batch();

            // Reference to the current user's document
            const myDoc = firestore().collection("Users").doc(myUid);

            // Reference to the target user's document
            const theirDoc = firestore().collection("Users").doc(itemId);

            // Update the current user's data
            batch.update(myDoc, {
              friendList: firestore.FieldValue.arrayRemove(itemId), // Remove the friend from current user's list
            });

            // Update the target user's data
            batch.update(theirDoc, {
              friendList: firestore.FieldValue.arrayRemove(myUid), // Remove the friend from target user's list
            });

            // Commit the batch operation
            await batch.commit();
            fetchFriends();

            Alert.alert("Success", "Friend removed successfully!");
          } catch (error) {
            console.error("Error removing friend:", error);
            Alert.alert(
              "Error",
              "An error occurred while removing the friend."
            );
          }
        },
      },
    ]);
  };

  const handleChallengeFriend = (itemId) => {
    console.log(itemId);
    clearFields2();
    setType("ChallengingFriends");

    const currentChallenge = getFetchedFriendChallengeID();

    if (currentChallenge === "") {
      console.log("FETCHING");
      // let questions = 9;
      let challenge = q;
      console.log("CHALLENGE", challenge);
      let questions = fetchChallengingFriendsQuestions(challenge);
      if (questions === 0) {
        setErr(true);
        // console.log("YES");
      } else {
        console.log("FETCH COMPLERE");

        const nextScreen = getQuestionType(getFriendChallengeQuestion());

        console.log("NEXT SCREEN", nextScreen);
        router.navigate(nextScreen);
      }
    } else {
      // Already Fetched Questions
      const nextScreen = getQuestionType(getFriendChallengeQuestion());
      if (nextScreen === "wordscrambled") {
        router.replace("wordscrambledfriendchallenge");
      } else {
        router.replace(nextScreen);
      }
    }
  };

  return (
    <View style={styles.container}>
      {showInvitation && (
        <SlideUpView
          visible={showInvitation}
          onClose={() => setShowInvitation(false)}
          invitations={invitations}
          invitationsLoading={invitationsLoading}
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
        />
      )}
      <StatusBar style="dark" />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <BackButton />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            rowGap: 10,
            marginRight: 10,
            justifyContent: "center",
          }}
        >
          <AddFriend
            setShowInvitation={setShowInvitation}
            count={invitations.length}
          />
          <TouchableOpacity
            onPress={() => router.navigate("FriendsLeaderboard")}
          >
            <Image source={leaderBoardImg} style={styles.buttonCircleStyle} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <ScrubLogo />
          {/* Tabs */}
          <View style={styles.tabs}>
            <Pressable onPress={() => setActive("friends")}>
              <CustomText
                style={[
                  styles.tabHeader,
                  active === "friends" ? styles.current : styles.inactive,
                ]}
              >
                My Friends
              </CustomText>
            </Pressable>
            <Pressable onPress={() => setActive("invite")}>
              <CustomText
                style={[
                  styles.tabHeader,
                  active === "invite" ? styles.current : styles.inactive,
                ]}
              >
                Invite Friend
              </CustomText>
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
                    // onChallenge={handleChallengeFriend}
                    key={friend.uid}
                    Name={friend.username || "Unknown"}
                    photoUrl={friend.avatarId}
                    id={friend.uid}
                    onRemove={handleRemoveFriend}
                  />
                ))
              ) : (
                <CustomText style={styles.noFriendsText}>
                  It seems you're flying solo. Add some friends and make it more
                  fun!
                </CustomText>
              )}
            </ScrollView>
          ) : (
            <ScrollView>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.inviteFriendContainer}
              >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View>
                    <View style={styles.titleinviteFriend}>
                      <CustomText style={styles.titleText}>
                        Share the Scrub Hub Experience - Invite Today!
                      </CustomText>
                      <TouchableOpacity
                        onPress={() => router.navigate("UserContacts")}
                      >
                        <CustomText style={styles.contactBtn}>
                          Search Contacts
                        </CustomText>
                      </TouchableOpacity>
                      <CustomText style={{ fontWeight: "bold", marginTop: 15 }}>
                        OR
                      </CustomText>
                      <CustomText style={styles.subtitleText}>
                        Enter your Friend's Mobile Number
                      </CustomText>
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
                    <View>
                      <TouchableOpacity
                        style={styles.inviteButton}
                        disabled={sendInviteLoading}
                      >
                        {sendInviteLoading ? (
                          <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                          <CustomText
                            style={styles.inviteButtonText}
                            onPress={sendInvite}
                          >
                            Send Invite
                          </CustomText>
                        )}
                      </TouchableOpacity>
                    </View>

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
                          <CustomText style={styles.title}>
                            Invitation Sent Successfully!
                          </CustomText>

                          {/* Description */}
                          <CustomText style={styles.description}>
                            Your invite is on its way! Let your friend join the
                            Scrub Hub fun and start exploring.
                          </CustomText>
                        </View>
                      </TouchableOpacity>
                    </Modal>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </ScrollView>
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
    marginTop: 25,
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
  buttonCircleStyle: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    width: 25,
    height: 25,
    marginTop: 60,
    alignSelf: "flex-start",
    marginRight: 25,
    marginBottom: 10,
  },
  contactBtn: {
    color: "blue",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
});
