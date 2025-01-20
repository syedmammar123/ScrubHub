import React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  Image,
} from "react-native";
import BackButton from "@/components/backButton";
import Friend from "@/components/friend";
import { theme } from "@/theme";
import useGetScores from "@/hooks/useGetScores";

export default function ChallengeLeaderboard() {
  const {scores,loading} = useGetScores({ scoreField: "totalScore" });
  console.log("scores",scores)
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0038FF" barStyle="light-content" />

      {/* Top 3 */}
      <View style={styles.upperContainer}>
        <View style={styles.topRow}>
          <BackButton />
          <View style={{ flex: 1, alignSelf: "center" }}>
            <Text style={styles.heading}>DAILY CHALLENGE LEADERBOARD</Text>
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
          <View style={styles.circleContainer}>
            <Image
              style={styles.circles}
              source={{
                uri: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              }}
            />
            <View style={styles.smallCircle}>
              <Text style={styles.numberText}>02</Text>
            </View>
          </View>

          <View style={styles.circleContainer}>
            <Image
              style={styles.circles2}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd_LiQaLtCPsF-2qx_iUDTftXaimTQcIWMFafE_oWYLoyhxfWJ8W4GLn1H5criVfFAKIE&usqp=CAU",
              }}
            />
            <View style={styles.smallCircle2}>
              <Text style={styles.numberText}>01</Text>
            </View>
          </View>

          <View style={styles.circleContainer}>
            <Image
              style={styles.circles}
              source={{
                uri: "https://t3.ftcdn.net/jpg/02/42/00/04/360_F_242000451_i5W8qBEWBw5hthTWgPTogYYl8qxIX4f5.jpg",
              }}
            />
            <View style={styles.smallCircle}>
              <Text style={styles.numberText}>03</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 4 to n Positions */}
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
    justifyContent: "space-between",
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
