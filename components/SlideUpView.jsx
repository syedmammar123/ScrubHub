import React, { useRef, useEffect } from "react";
import {
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Friend from "./friend";
import { getAvatarImage } from "@/util/getAvatarImage";

const SlideUpView = ({
  visible,
  onClose,
  invitations,
  invitationsLoading,
  onAccept,
  onReject,
  fetchFriends,
}) => {
  const screenHeight = Dimensions.get("window").height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (visible) {
      // Animate the view from bottom to top
      Animated.timing(translateY, {
        toValue: 0, // Final position (top of the screen)
        duration: 500, // Animation duration
        useNativeDriver: true,
      }).start();
    } else {
      // Animate the view back to bottom
      Animated.timing(translateY, {
        toValue: screenHeight, // Initial position (bottom of the screen)
        duration: 500, // Animation duration
        useNativeDriver: true,
      }).start(() => onClose?.());
    }
  }, [visible]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.buttonCircleStyle}
            onPress={() => onClose()}
          >
            <Feather name="chevron-down" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.heading}>Invitations</Text>
        </View>

        {invitationsLoading ? (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size={"large"}
            color={"blue"}
          />
        ) : invitations && invitations.length > 0 ? (
          invitations.map((invitation, index) => (
            <Friend
              key={invitation.uid}
              Name={invitation.username || "Unknown"}
              acceptBtn={true}
              photoUrl={
                invitation.avatarId
                  ? getAvatarImage(invitation.avatarId)
                  : getAvatarImage(0)
              }
              onAccept={onAccept}
              onReject={onReject}
              id={invitation.uid}
            />
          ))
        ) : (
          <Text style={styles.noFriendsText}>No invitations found</Text>
        )}
      </SafeAreaView>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: -2 },
    padding: 20,
    zIndex: 1000,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
  },
  buttonCircleStyle: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F6F6F7",
    alignSelf: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 80,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  noFriendsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});

export default SlideUpView;
