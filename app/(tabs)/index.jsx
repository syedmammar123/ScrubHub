import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/theme";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Redirect, useRouter } from "expo-router";
import ScrubLogo from "@/components/scrubLogo";
import BackgroundImage from "@/components/backgroundImage";
import useQuesStore from "@/store/quesStore";
import useCurrentUserStore from "@/store/currentUserStore";
import { getQuestionType } from "@/util/utilQuesFunc";
import useGetSolvedQues from "@/hooks/useGetSolvedQues";
import CustomText from "@/components/CustomText";
import LottieView from "lottie-react-native";

export default function App() {
  const state = useGetSolvedQues();
  const {
    setType,
    fetchChallengeQuestions,
    getChallengeQuestion,
    submitChallengeQuestions,
    getFetchedChallengeID,
    submitQuestions,
    getCurrentType,
    submitReviews,
  } = useQuesStore((state) => state);
  // const { getUser } = useCurrentUserStore((state) => state);
  const router = useRouter();
  const handlePress = (screen) => {
    router.navigate(`${screen}`);
  };
  const handleChallengePress = async () => {
    if (getFetchedChallengeID() === "") {
      const questions = await fetchChallengeQuestions();
      console.log(questions);
      if (questions === 0) {
        router.navigate("challengeLeaderboard");
      } else {
        const nextScreen = getQuestionType(getChallengeQuestion());

        console.log("NEXT SCREEN", nextScreen);
        router.navigate(nextScreen);
      }
    } else {
      const nextScreen = getQuestionType(getChallengeQuestion());
      if (nextScreen === "wordscrambled") {
        router.replace("wordscrambledchallenge");
      } else {
        router.replace(nextScreen);
      }
    }
  };
  // const user = useCurrentUserStore((state) => state.user);

  // if (!user) {
  //    return <Redirect href="onboarding" />;
  //  }
  const user = useCurrentUserStore((state) => state.user);
  // console.log(user);

  const handleSave = async () => {
    // console.log(state);

    // // console.log("USER FROM TEST", getUser());
    // // await submitChallengeQuestions();
    // // await submitReviews();
    // // await submitQuestions();
    // //  router.navigate("scoreScreen");

    // // Testing for saving topics
    await submitQuestions();
  };

  if (!user) {
    return <Redirect href="onboarding" />;
  }

  // console.log(user);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Curvy Lines Background */}
      <BackgroundImage>
        {/* Content Container */}
        <SafeAreaView style={styles.contentContainer}>
          {/* Logo */}
          <ScrubLogo />
          {/* Buttons */}

          {/* <TouchableOpacity style={[styles.button]} onPress={handleSave}>
            <View
              style={[styles.redButton, styles.buttonStyle, styles.buttonFP]}
            >
              <Entypo name="graduation-cap" size={24} color="white" />
            </View>

            <Text
              style={[
                styles.redButton,
                styles.buttonStyle,
                styles.buttonText,
                styles.buttonSP,
              ]}
            >
              Testing
            </Text>
            
          </TouchableOpacity> */}
          <LottieView
            source={require("../../assets/animations/xrays unscreen.json")}
            autoPlay
            loop
            style={{ width: 100, height: 150 }}
          />
        
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              setType("study");
              handlePress("details");
            }}
          >
            <View
              style={[styles.redButton, styles.buttonStyle, styles.buttonFP]}
            >
              <Entypo name="graduation-cap" size={24} color="white" />
            </View>

            <CustomText
              style={[
                styles.redButton,
                styles.buttonStyle,
                styles.buttonText,
                styles.buttonSP,
              ]}
            >
              STUDY BY SYSTEM
            </CustomText>
          </TouchableOpacity>
          {/* </Link> */}

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              setType("review");
              handlePress("review");
            }}
          >
            <View
              style={[styles.yellowButton, styles.buttonStyle, styles.buttonFP]}
            >
              <MaterialIcons name="reviews" size={24} color="white" />
            </View>

            <CustomText
              style={[
                styles.yellowButton,
                styles.buttonStyle,
                styles.buttonText,
                styles.buttonSP,
              ]}
            >
              REVIEW
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              setType("challenge");
              handleChallengePress();
            }}
          >
            <View
              style={[styles.purpleButton, styles.buttonStyle, styles.buttonFP]}
            >
              <MaterialCommunityIcons
                name="progress-question"
                size={24}
                color="white"
              />
            </View>

            <CustomText
              style={[
                styles.purpleButton,
                styles.buttonStyle,
                styles.buttonText,
                styles.buttonSP,
              ]}
            >
              DAILY CHALLENGE
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => handlePress("friends")}
          >
            <View
              style={[styles.blueButton, styles.buttonStyle, styles.buttonFP]}
            >
              <FontAwesome5 name="user-friends" size={24} color="white" />
            </View>

            <CustomText
              style={[
                styles.blueButton,
                styles.buttonStyle,
                styles.buttonText,
                styles.buttonSP,
              ]}
            >
              PLAY WITH YOUR FRIENDS
            </CustomText>
          </TouchableOpacity>
        </SafeAreaView>
      </BackgroundImage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
  },

  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: "79%",
    height: 130,
    marginBottom: 10,
  },

  button: {
    width: "85%",
    // borderRadius: 4,
    alignItems: "center",
    marginVertical: 13,
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  redButton: {
    backgroundColor: "#FF0000",
  },

  buttonStyle: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    // paddingHorizontal: 10,
  },

  buttonFP: {
    borderWidth: 1,
    borderRadius: 6,
    borderBottomRightRadius: 1,
    borderTopRightRadius: 1,
    flex: 1,
    marginRight: 10,
  },

  buttonSP: {
    borderWidth: 1,
    borderRadius: 6,
    borderBottomLeftRadius: 1,
    borderTopLeftRadius: 1,
    flex: 7,
    height: "100%",
  },
  yellowButton: {
    backgroundColor: "#FFB800",
  },
  purpleButton: {
    backgroundColor: "#9E00FF",
  },
  blueButton: {
    backgroundColor: "#0038FF",
  },
  lightBlueButton: {
    backgroundColor: "#00CFFF",
  },
  buttonText: {
    color: theme.colorWhite,
    // fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    // fontFamily: "Poppins-Regular",
    fontFamily: "Poppins-Semi",
  },
});
