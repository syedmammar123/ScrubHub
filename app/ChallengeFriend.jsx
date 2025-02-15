import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { theme } from "@/theme";
import BackgroundImage from "@/components/backgroundImage";
import ScrubLogo from "@/components/scrubLogo";
import useGetFriends from "@/hooks/useGetFriends";
import ChallengeFriendItem from "@/components/ChallengeFriendItem";
import { useRouter } from "expo-router";
import CustomText from "@/components/CustomText";

const ChallengeFriend = () => {
  const { loading, error, friends } = useGetFriends();

  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <BackgroundImage>
        <View contentContainerStyle={styles.scrollContainer} className="pt-14">
          <ScrubLogo  type={null}/>
          <CustomText className="font-semibold text-center text-xl">
            Challenge a friend
          </CustomText>
          {error && (
            <CustomText className="text-center text-red-500 mt-10">
              {error}
            </CustomText>
          )}
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" className="mt-10" />
          ) : (
            <ScrollView className="mt-10 max-h-[50%]">
              {friends.map((friend) => (
                <ChallengeFriendItem
                  key={friend.id}
                  friend={friend}
                  friends={friends}
                />
              ))}
            </ScrollView>
          )}
          <View className="flex-row items-center justify-center">
            <TouchableOpacity
              className="bg-[#93D334] py-2 px-4 rounded mt-10 "
              onPress={() => router.navigate("/")}
            >
              <CustomText className="text-white text-center">
                Goto Home
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </BackgroundImage>
    </View>
  );
};

export default ChallengeFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  scrollContainer: {
    flex: 1,
  },
});
