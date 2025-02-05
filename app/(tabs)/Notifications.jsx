import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { theme } from "@/theme";
import BackButton from "@/components/backButton";
import BackgroundImage from "@/components/backgroundImage";
import ScrubLogo from "@/components/scrubLogo";
import useCurrentUserStore from "@/store/currentUserStore";
import useGetNotifications from "@/hooks/useGetNotifications";
import { formatDateOnly, formatTimeOnly } from "@/util/getRandomItem";
import { avatars } from "../userInfoScreen";

const dummyNotifications = [
  {
    avatars: [1, 2],
    timestamp: "5 February 2025 at 10:24:46 UTC+5",
    text: "You have a new message from John.",
  },
  {
    avatars: [3],
    timestamp: "5 February 2025 at 11:10:30 UTC+5",
    text: "Your order has been shipped.",
  },
  {
    avatars: [2, 3],
    timestamp: "5 February 2025 at 12:45:15 UTC+5",
    text: "Reminder: Meeting scheduled for 3 PM.",
  },
  {
    avatars: [1],
    timestamp: "5 February 2025 at 13:20:10 UTC+5",
    text: "System update completed successfully.",
  },
  {
    avatars: [2],
    timestamp: "5 February 2025 at 14:05:22 UTC+5",
    text: "A new comment was added to your post.",
  },
  {
    avatars: [1, 3],
    timestamp: "27 January 2025 at 15:30:05 UTC+5",
    text: "Your password was changed successfully.",
  },
  {
    avatars: [3],
    timestamp: "1 February 2025 at 16:15:40 UTC+5",
    text: "You have a new friend request.",
  },
  {
    avatars: [2, 1],
    timestamp: "2 February 2025 at 17:50:55 UTC+5",
    text: "Payment of $20 was received.",
  },
  {
    avatars: [1, 2],
    timestamp: "3 February 2025 at 18:35:20 UTC+5",
    text: "Your subscription has been renewed.",
  },
  {
    avatars: [3, 1],
    timestamp: "5 January 2025 at 19:10:00 UTC+5",
    text: "Your scheduled event is starting soon.",
  },
];

const NotificationsScreen = () => {
  const { user, userNotifications } = useCurrentUserStore((state) => state);
  const { loading, error } = useGetNotifications();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackgroundImage>
        <BackButton />
        <View contentContainerStyle={styles.scrollContainer}>
          <ScrubLogo />
          {/* {error && userNotifications.length === 0 && (
            <Text className="text-center text-red-500 mt-10">{error}</Text>
          )} */}
          {/* {loading && userNotifications.length === 0 && (
            <ActivityIndicator size="large" color="#0000ff" className="mt-10" />
          )} */}
          {dummyNotifications.length > 0 && (
            <View>
              <ScrollView className="max-h-[74%] pb-96" >
                {dummyNotifications.map((notification) => (
                  <View
                    key={notification.timestamp}
                    className="flex-row items-center p-3 rounded-lg border-b border-gray-300"
                  >
                    <View className="flex-row">
                      {notification.avatars.map((avatar, index) => (
                        <Image
                          key={index}
                          source={avatars[avatar]}
                          className={`w-10 h-10 rounded-full ${index !== 0 ? "-ml-3" : ""}`}
                        />
                      ))}
                    </View>
                    <View className={`flex-1 flex-col w-full ${notification.avatars.length > 1 ? "ml-3" : "ml-10"}`}>
                      <Text className="text-sm text-gray-900">
                        {notification.text}
                      </Text>
                      <View className="flex-row justify-between items-center mt-3">
                        <Text className="text-xs text-gray-500">
                          {formatDateOnly(notification.timestamp)}
                        </Text>
                        <Text className="text-xs text-gray-500">
                          {formatTimeOnly(notification.timestamp)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </BackgroundImage>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  scrollContainer: {
    flex: 1,
  },
});
