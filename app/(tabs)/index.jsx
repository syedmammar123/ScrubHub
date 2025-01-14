import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  Text,
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
import { useRouter } from "expo-router";
import ScrubLogo from "@/components/scrubLogo";
import BackgroundImage from "@/components/backgroundImage";
import useCurrentUserStore from "@/store/currentUserStore";
import { useEffect } from "react";
import useQuesStore from "@/store/quesStore";
import review from "../review";

export default function App() {
  const { fetchUser } = useCurrentUserStore((state) => state);
  const { submitQuestions, setType, getCurrentType, submitReviews } =
    useQuesStore((state) => state);
  const router = useRouter();
  const handlePress = (screen) => {
    router.navigate(`${screen}`);
  };

  // const handleSave = () => {

  //   router.navigate("scoreScreen");
  // };

  useEffect(() => {
    fetchUser();
    // fetchQuestions();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

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
              Test Screen
            </Text>
          </TouchableOpacity> */}
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

            <Text
              style={[
                styles.redButton,
                styles.buttonStyle,
                styles.buttonText,
                styles.buttonSP,
              ]}
            >
              STUDY BY SYSTEM
            </Text>
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

            <Text
              style={[
                styles.yellowButton,
                styles.buttonStyle,
                styles.buttonText,
                styles.buttonSP,
              ]}
            >
              REVIEW
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => handlePress("fourOptQues")}
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

            <Text
              style={[
                styles.purpleButton,
                styles.buttonStyle,
                styles.buttonText,
                styles.buttonSP,
              ]}
            >
              DAILY CHALLENGE
            </Text>
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

            <Text
              style={[
                styles.blueButton,
                styles.buttonStyle,
                styles.buttonText,
                styles.buttonSP,
              ]}
            >
              PLAY WITH YOUR FRIENDS
            </Text>
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
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
});
