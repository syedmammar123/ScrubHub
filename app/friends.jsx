import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import { theme } from "@/theme";
import ScrubLogo from "@/components/scrubLogo";
import Friend from "@/components/friend";

export default function Friends() {
  const [active, setActive] = useState("friends");

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
            ""
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
});
