import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { theme } from "@/theme";
import BackButton from "@/components/backButton";
import BackgroundImage from "@/components/backgroundImage";
import ScrubLogo from "@/components/scrubLogo";
import { ScrollView } from "react-native-gesture-handler";
import useCurrentUserStore from "@/store/currentUserStore";

const Notifications = () => {
    const { user,userNotifications } = useCurrentUserStore((state) => state);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackgroundImage>
        <BackButton/>
        <View contentContainerStyle={styles.scrollContainer}>
          <ScrubLogo />
          <ScrollView>

          </ScrollView>
        </View>
      </BackgroundImage>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  scrollContainer: {
    flex: 1,
  },
});
