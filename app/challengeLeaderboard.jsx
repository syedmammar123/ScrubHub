// import React from "react";
// import {
//   View,
//   StatusBar,
//   StyleSheet,
//   ScrollView,
//   Text,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import BackButton from "@/components/backButton";
// import Friend from "@/components/friend";
// import { theme } from "@/theme";
// import useGetScores from "@/hooks/useGetScores";
// import { avatars } from "./userInfoScreen";
// import CustomText from "@/components/CustomText";
// import auth from "@react-native-firebase/auth";

// const scores1 = [
//   {
//     avatar: 2,
//     id: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
//     lastChallengeScore: 7,
//     name: "Ammar",
//   },
//   {
//     avatar: 2,
//     id: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
//     lastChallengeScore: 7,
//     name: "Ammar",
//   },
//   {
//     avatar: 2,
//     id: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
//     lastChallengeScore: 7,
//     name: "Ammar",
//   },
//   {
//     avatar: 2,
//     id: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
//     lastChallengeScore: 7,
//     name: "Ammar",
//   },
//   {
//     avatar: 2,
//     id: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
//     lastChallengeScore: 7,
//     name: "Ammar",
//   },
// ];

// export default function ChallengeLeaderboard() {
//   const { scores, loading } = useGetScores({
//     scoreField: "lastChallengeScore",
//   });
//   console.log("scores", scores);

//   const currentUserId = auth().currentUser?.uid;


//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }
//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#0038FF" barStyle="light-content" />

//       {/* Top 3 */}
//       <View style={styles.upperContainer}>
//         <View style={styles.topRow}>
//           <BackButton />
//           <View style={{ flex: 1, alignSelf: "center" }}>
//             <CustomText style={styles.heading}>
//               DAILY CHALLENGE LEADERBOARD
//             </CustomText>
//           </View>
//         </View>

//         <View style={styles.crownContainer}>
//           <Image
//             style={{ width: 50, height: 50 }}
//             source={require("@/assets/crown.png")}
//           />
//         </View>

//         {/* Circles with numbers */}
//         <View style={styles.images}>
//           {/* 2nd Position */}
//           <View
//             style={[
//               styles.circleContainer,
//               scores.length < 2 ? { opacity: 0 } : {},
//             ]}
//           >
//             <Image style={styles.circles} source={avatars[scores[1]?.avatar]} />
//             <View style={styles.smallCircle}>
//               <CustomText style={styles.numberText}>{scores[1]?.lastChallengeScore}</CustomText>
//             </View>
//           </View>

//           {/* 1st Position */}

//           <View style={styles.circleContainer}>
//             <Image
//               style={styles.circles2}
//               source={avatars[scores[0]?.avatar]}
//             />
//             <View style={styles.smallCircle2}>
//               <CustomText style={styles.numberText}>{scores[0]?.lastChallengeScore}</CustomText>
//             </View>
//           </View>

//           {/* 3rd Position */}
//           <View
//             style={[
//               styles.circleContainer,
//               scores.length < 3 ? { opacity: 0 } : {},
//             ]}
//           >
//             <Image style={styles.circles} source={avatars[scores[2]?.avatar]} />
//             <View style={styles.smallCircle}>
//               <CustomText style={styles.numberText}>{scores[2]?.lastChallengeScore}</CustomText>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* 4 to n Positions */}
//       <ScrollView style={styles.lowerContainer}>
//         {scores.length > 3 &&
//           scores
//             .slice(3)
//             .map((friend, index) => (
//               <Friend
//                 key={friend.id}
//                 position={index + 4}
//                 marks={`${friend.lastChallengeScore}/15`}
//                 Name={friend.id === currentUserId
//                     ? `${friend.name} (You)`
//                     : friend.name}
//                 photoUrl={friend.avatar}
//               />
//             ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colorWhite,
//   },
//   upperContainer: {
//     backgroundColor: "#0038FF",
//     width: "100%",
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     alignItems: "center",
//     position: "relative",
//     marginBottom: 70,
//   },
//   topRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//   },
//   heading: {
//     color: "white",
//     fontSize: 15,
//     fontWeight: "bold",
//     marginTop: 65,
//     textAlign: "center",
//     marginRight: 35,
//   },
//   crownContainer: {
//     marginBottom: 80,
//     marginTop: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   images: {
//     width: "90%",
//     flexDirection: "row",
//     justifyContent: "center",
//     position: "absolute",
//     bottom: -80,
//   },
//   circleContainer: {
//     alignItems: "center",
//     position: "relative",
//   },
//   circles: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 3,
//     borderColor: "#0038FF",
//     marginTop: 20,
//   },
//   circles2: {
//     width: 155,
//     height: 155,
//     borderRadius: 78,
//     borderWidth: 3,
//     borderColor: "#0038FF",
//   },
//   smallCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#0038FF",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "absolute",
//     bottom: 20,
//   },
//   smallCircle2: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#0038FF",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "absolute",
//     bottom: -15,
//   },
//   numberText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   lowerContainer: {
//     flex: 1,
//     marginTop: 15,
//   },
// });
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
import auth from "@react-native-firebase/auth";

// Default avatar for placeholder entries
const defaultAvatar = 0; // Assuming 0 is a valid avatar index

// Dummy data for when we have fewer than 4 scores
const createDummyEntry = (position) => ({
  avatar: defaultAvatar,
  id: `dummy-${position}`,
  lastChallengeScore: "?",
  name: "Coming Soon",
});

export default function ChallengeLeaderboard() {
  const { scores: originalScores, loading } = useGetScores({
    scoreField: "lastChallengeScore",
  });
  
  const currentUserId = auth().currentUser?.uid;
  
  // Create a new array with the original scores plus dummy entries if needed
  const scores = React.useMemo(() => {
    if (originalScores.length >= 4) {
      return [...originalScores];
    }
    
    // Create a copy of original scores
    const newScores = [...originalScores];
    
    // Add dummy entries until we have at least 4 entries
    while (newScores.length < 4) {
      newScores.push(createDummyEntry(newScores.length + 1));
      newScores.push(createDummyEntry(newScores.length + 1));
      newScores.push(createDummyEntry(newScores.length + 1));
      newScores.push(createDummyEntry(newScores.length + 1));
      newScores.push(createDummyEntry(newScores.length + 1));
      newScores.push(createDummyEntry(newScores.length + 1));
      newScores.push(createDummyEntry(newScores.length + 1));
      newScores.push(createDummyEntry(newScores.length + 1));
      newScores.push(createDummyEntry(newScores.length + 1));

    }
    
    return newScores;
  }, [originalScores]);

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
            <CustomText style={styles.heading}>
              DAILY CHALLENGE LEADERBOARD
            </CustomText>
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
          <View style={styles.circleContainer}>
            <CustomText style={styles.nameText}>{scores[1]?.id === currentUserId ? "You" : scores[1]?.name}</CustomText>
            
            <Image style={styles.circles} source={avatars[scores[1]?.avatar]} />
            <View style={styles.smallCircle}>
              <CustomText style={styles.numberText}>{scores[1]?.lastChallengeScore}</CustomText>
            </View>
          </View>

          {/* 1st Position */}
          <View style={styles.circleContainer}>


              <CustomText style={styles.nameText1st}>{scores[0]?.id === currentUserId ? "You" : scores[0]?.name}</CustomText>
            <Image
              style={styles.circles2}
              source={avatars[scores[0]?.avatar]}
            />
            <View style={styles.smallCircle2}>
              <CustomText style={styles.numberText}>{scores[0]?.lastChallengeScore}</CustomText>
            </View>
          </View>

          {/* 3rd Position */}
          <View style={styles.circleContainer}>
            <CustomText style={styles.nameText}>{scores[2]?.id === currentUserId ? "You" : scores[2]?.name}</CustomText>
            <Image style={styles.circles} source={avatars[scores[2]?.avatar]} />
            <View style={styles.smallCircle}>
              <CustomText style={styles.numberText}>{scores[2]?.lastChallengeScore}</CustomText>
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
                marks={friend.lastChallengeScore === "?" 
                  ? "?" 
                  : `${friend.lastChallengeScore}/15`}
                Name={friend.id === currentUserId
                    ? `${friend.name} (You)`
                    : friend.name}
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
    marginBottom: 100,
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
  nameText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  nameText1st: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  lowerContainer: {
    flex: 1,
    marginTop: 15,
  },
});