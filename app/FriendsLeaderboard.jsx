import BackgroundImage from "@/components/backgroundImage";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import ScrubLogo from "@/components/scrubLogo";
import Friend from "@/components/friend";
import { theme } from "@/theme";
import useGetScores from "@/hooks/useGetScores";

export default function FriendsLeaderboard() {
  const { scores, loading } = useGetScores({ scoreField: "totalScore" });
  console.log("scores", scores);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <BackgroundImage>
        <ScrubLogo />
        <ScrollView style={styles.lowerContainer}>
          <Friend
            position={"04"}
            marks={"10/15"}
            Name={"Michael Wels"}
            photoUrl={
              "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            }
          />
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
