import React, { useState } from "react";
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

export default function Friends() {
  const [active, setActive] = useState("friends");

  const [dropDownActive, setDropDownActive] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  const [countryCode, setCountryCode] = useState("+1");

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
              <Friend
                Name={"Michael Wels"}
                photoUrl={
                  "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                }
              />
              <Friend
                Name={"Oliver"}
                photoUrl={
                  "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2430"
                }
              />
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
                        placeholderTextColor={"white"}
                        bgColor="black"
                      />
                    </View>
                  </View>
                  <TouchableOpacity style={styles.inviteButton}>
                    <Text
                      style={styles.inviteButtonText}
                      onPress={() => setInviteSent(true)}
                    >
                      Send an invite
                    </Text>
                  </TouchableOpacity>

                  {/* Dropdown Modal */}
                  <CountryPickerModal
                    setCountryCode={setCountryCode}
                    setDropDownActive={setDropDownActive}
                    dropDownActive={dropDownActive}
                  />
                  {/* {InviteSemtModal} */}
                  <Modal
                    visible={inviteSent}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setInviteSent(false)}
                  >
                    <TouchableOpacity
                      style={styles.inviteSentoverlay}
                      onPress={() => setInviteSent(false)}
                    >
                      <View style={styles.inviteSentContainer}>
                        <View>
                          <MaterialIcons
                            name="mobile-friendly"
                            size={40}
                            color="skyblue"
                          />
                        </View>
                        <Text
                          style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: 19,
                          }}
                        >
                          Invitation Sent Successfully!
                        </Text>
                        <Text style={{ textAlign: "center", width: "80%" }}>
                          Your invite is on its way! Let your friend join the
                          Scrub Hub fun and start exploring
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
  titleinviteFriend: { alignItems: "center", marginBottom: 20 },
  titleText: { fontSize: 21, textAlign: "center", fontWeight: "bold" },
  subtitleText: { marginVertical: 20 },
  numberinviteFriend: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginBottom: 20,
  },

  inviteButton: {
    width: "90%",
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 5,
  },
  inviteButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  inviteSentoverlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    maxHeight: 300,
  },
});
