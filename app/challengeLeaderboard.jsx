import React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import BackButton from "@/components/backButton";
import Friend from "@/components/friend";
import { theme } from "@/theme";
import useGetScores from "@/hooks/useGetScores";
import { avatars } from "./userInfoScreen";
import CustomText from "@/components/CustomText";

const scores1 = [
  {
    avatar: 2,
    id: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
    lastChallengeScore: 7,
    name: "Ammar",
  },
  {
    avatar: 2,
    id: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
    lastChallengeScore: 7,
    name: "Ammar",
  },
  {
    avatar: 2,
    id: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
    lastChallengeScore: 7,
    name: "Ammar",
  },
  {
    avatar: 2,
    id: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
    lastChallengeScore: 7,
    name: "Ammar",
  },
  {
    avatar: 2,
    id: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
    lastChallengeScore: 7,
    name: "Ammar",
  },
];

export default function ChallengeLeaderboard() {
  const { scores, loading } = useGetScores({
    scoreField: "lastChallengeScore",
  });
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
      <StatusBar backgroundColor="#0038FF" barStyle="light-content" />

      {/* Top 3 */}
      <View style={styles.upperContainer}>
        <View style={styles.topRow}>
          <BackButton />
          <View style={{ flex: 1, alignSelf: "center" }}>
            <CustomText style={styles.heading}>DAILY CHALLENGE LEADERBOARD</CustomText>
          </View>
        </View>

        <View style={styles.crownContainer}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("@/assets/crown.png")}
          />
        </View>

        {/* Circles with numbers */}
        <View style={styles.images}>
          {/* 2nd Position */}
          <View
            style={[
              styles.circleContainer,
              scores.length < 2 ? { opacity: 0 } : {},
            ]}
          >
            <Image style={styles.circles} source={avatars[scores[1]?.avatar]} />
            <View style={styles.smallCircle}>
              <CustomText style={styles.numberText}>02</CustomText>
            </View>
          </View>

          {/* 1st Position */}

          <View style={styles.circleContainer}>
            <Image
              style={styles.circles2}
              source={avatars[scores[0]?.avatar]}
            />
            <View style={styles.smallCircle2}>
              <CustomText style={styles.numberText}>01</CustomText>
            </View>
          </View>

          {/* 3rd Position */}
          <View
            style={[
              styles.circleContainer,
              scores.length < 3 ? { opacity: 0 } : {},
            ]}
          >
            <Image style={styles.circles} source={avatars[scores[2]?.avatar]} />
            <View style={styles.smallCircle}>
              <CustomText style={styles.numberText}>03</CustomText>
            </View>
          </View>
        </View>
      </View>

      {/* 4 to n Positions */}
      <ScrollView style={styles.lowerContainer}>
        {scores.length > 3 &&
          scores
            .slice(3)
            .map((friend, index) => (
              <Friend
                key={friend.id}
                position={index + 4}
                marks={`${friend.lastChallengeScore}/9`}
                Name={friend.name}
                photoUrl={friend.avatar}
              />
            ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  upperContainer: {
    backgroundColor: "#0038FF",
    width: "100%",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: "center",
    position: "relative",
    marginBottom: 70,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  heading: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 65,
    textAlign: "center",
    marginRight: 35,
  },
  crownContainer: {
    marginBottom: 80,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  images: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: -80,
  },
  circleContainer: {
    alignItems: "center",
    position: "relative",
  },
  circles: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#0038FF",
    marginTop: 20,
  },
  circles2: {
    width: 155,
    height: 155,
    borderRadius: 78,
    borderWidth: 3,
    borderColor: "#0038FF",
  },
  smallCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0038FF",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  smallCircle2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0038FF",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -15,
  },
  numberText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  lowerContainer: {
    flex: 1,
    marginTop: 15,
  },
});
