// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import { theme } from "../../theme";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Bismillah!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colorWhite,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/theme";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Curvy Lines Background */}
      <ImageBackground
        source={require("@/assets/background.png")} // Path to your background image
        style={styles.background}
        resizeMode="contain"
      >
        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/scrubLogo.png")} // Replace with your logo URL or local file
              style={styles.logoImage}
            />
          </View>

          {/* Buttons */}
          <TouchableOpacity style={[styles.button]}>
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

          <TouchableOpacity style={[styles.button]}>
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

          <TouchableOpacity style={[styles.button]}>
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

          <TouchableOpacity style={[styles.button]}>
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

          <TouchableOpacity style={[styles.button]}>
            <View
              style={[
                styles.lightBlueButton,
                styles.buttonStyle,
                styles.buttonFP,
              ]}
            >
              <MaterialCommunityIcons
                name="clipboard-text-search"
                size={24}
                color="white"
              />
            </View>

            <Text
              style={[
                styles.lightBlueButton,
                styles.buttonStyle,
                styles.buttonText,
                styles.buttonSP,
              ]}
            >
              CASE MYSTERY
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite, 
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
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
    // paddingHorizontal: 10,
  },
  
  buttonFP: {
    borderWidth: 1,
    borderRadius: 6,
    borderBottomRightRadius: 1,
    borderTopRightRadius: 1,
    flex: 1,
    marginRight:10
  },
  
  buttonSP: {
    borderWidth: 1,
    borderRadius: 6,
    borderBottomLeftRadius: 1,
    borderTopLeftRadius: 1,
    flex: 7,
    height: "100%"
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
