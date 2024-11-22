import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import { theme } from "@/theme";
import ScrubLogo from "@/components/scrubLogo";
import Friend from "@/components/friend";
import RNPickerSelect from "react-native-picker-select";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function Friends() {
  const [active, setActive] = useState("friends");
  const [selectedValue, setSelectedValue] = useState("");
  const [dropDownActive, setDropDownActive] = useState(true);

  const options = ["Option 1", "Option 2", "Option 3"];

  const selectOption = (option) => {
    setSelectedValue(option);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <BackButton />
      </View>

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

          {/* Friends */}
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
            <View style={styles.inviteFriendContainer}>
              <View style={styles.titleinviteFriend}>
                <Text
                  style={{
                    fontSize: 21,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Share the Scrub Hub Experience - Invite Today!
                </Text>
                <Text style={{ marginVertical: 20 }}>
                  Enter your Friend's Mobile Number
                </Text>
              </View>
              <View style={styles.numberinviteFriend}>
                {/* Dropdown */}
                <View style={{ width: "20%" }}>
                  <TouchableOpacity
                    onPress={() => setDropDownActive(true)}
                    style={{
                      backgroundColor: "black",
                      width: "100%",
                      paddingVertical: 12,
                      borderRadius: 5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      1
                    </Text>
                    <Ionicons name="chevron-down" size={21} color={"white"} />
                  </TouchableOpacity>
                </View>

                {/* Phone Number */}
                <View style={{ flex: 1 }}>
                  <TextInput
                    placeholder="Enter Number..."
                    placeholderTextColor={"white"}
                    keyboardType="number-pad"
                    style={styles.phoneInputStyles}
                  />
                </View>
              </View>
              <View style={styles.buttoninviteFriend}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    backgroundColor: "black",
                    paddingVertical: 15,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Send an invite
                  </Text>
                </TouchableOpacity>
              </View>
              {/* DropDown Modal */}
              <Modal
                visible={dropDownActive}
                transparent
                animationType="slide"
                onRequestClose={() => setDropDownActive(false)}
              >
                <TouchableOpacity
                  style={styles.overlay}
                  onPress={() => setDropdownVisible(false)}
                >
                  <View style={styles.dropdown}>
                    <FlatList
                      data={options}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.option}
                          onPress={() => selectOption(item)}
                        >
                          <Text>{item}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
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
    justifyContent: "center",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10,
  },
  tabHeader: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  current: {
    color: "blue",
    fontWeight: "bold",
  },
  inactive: {
    color: "#ADADAD",
  },
  tabDivider: {
    position: "relative",
    height: 10,
    alignItems: "center",
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

    transition: "left 0.1s",
  },
  friendContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 15,
    paddingBottom: 25,
  },
  inviteFriendContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    zIndex: 0,
  },
  titleinviteFriend: { alignItems: "center", width: "80%" },
  numberinviteFriend: {
    flexDirection: "row",
    width: "75%",
    alignItems: "center",
    columnGap: 20,
    marginBottom: 20,
  },
  phoneInputStyles: {
    backgroundColor: "black",
    color: "white",
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttoninviteFriend: {
    width: "75%",
  },
});
