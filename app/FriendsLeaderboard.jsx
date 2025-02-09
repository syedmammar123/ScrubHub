import BackgroundImage from "@/components/backgroundImage";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import ScrubLogo from "@/components/scrubLogo";
import Friend from "@/components/friend";
import { theme } from "@/theme";
import useGetScores from "@/hooks/useGetScores";
import BackButton from "@/components/backButton";
import auth from "@react-native-firebase/auth";

export default function FriendsLeaderboard() {
  const { scores, loading } = useGetScores({ scoreField: "totalScore" });
  const currentUserId = auth().currentUser?.uid;

  return (
    <View style={styles.container}>
      <BackButton />
      <BackgroundImage>
        <ScrubLogo />
        <ScrollView style={styles.lowerContainer}>
          {loading && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          {!loading &&
            scores.length > 0 &&
            scores.map((friend, index) => (
              <Friend
                key={friend.id}
                position={index + 1}
                marks={`${friend.totalScore}`}
                Name={
                  friend.id === currentUserId
                    ? `${friend.name} (You)`
                    : friend.name
                }
                photoUrl={friend.avatar}
              />
            ))}
          {!loading && scores?.length === 0 && (
            <CustomText style={{ textAlign: "center" }}>No records found</CustomText>
          )}
        </ScrollView>
      </BackgroundImage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  lowerContainer: {
    flex: 1,
    marginTop: 15,
  },
});
