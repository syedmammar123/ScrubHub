import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { router, Redirect } from "expo-router";
import { doc, getDoc, getFirestore } from "@react-native-firebase/firestore";
import { OtpInput } from "react-native-otp-entry";
import useCurrentUserStore from "@/store/currentUserStore";

export default function OtpScreen() {
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const setUser = useCurrentUserStore((state) => state.setUser);

  const user = useCurrentUserStore((state) => state.user);

  useEffect(() => {
    const { phoneNumber } = route.params;
    if (route.params?.phoneNumber) {
      setPhoneNumber(route.params.phoneNumber);
      signInWithPhoneNumber(route.params.phoneNumber);
    }
  }, [route.params?.phoneNumber]);

  const signInWithPhoneNumber = async (number) => {
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(number);
      setConfirm(confirmation);
      setLoading(false);
    } catch (error) {
      console.log("Error sending code: ", error);
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setLoading(false);
    } catch (error) {
      console.log("Error resending code: ", error);
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      if (confirm) {
        const result = await confirm.confirm(otp);
        const user = result.user;
        console.log(user);
        const uid = user.uid;

        const db = getFirestore();

        const userDocRef = doc(db, "Users", uid);

        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists) {
          console.log("User already registered:", userDoc.data());
          await setUser(userDoc.data(), uid);
          return router.navigate("/");
        } else {
          console.log("User not registered. Navigating to user info screen.");
          navigation.navigate("userInfoScreen", { phoneNumber, uid });
        }
        // router.navigate("/"); // Navigate to the next screen
      }
    } catch (error) {
      console.log("Invalid OTP code", error);
      alert("Invalid OTP code.");
    }
  };

  const handleTextChange = (text) => {
    setOtp(text);
  };

  if (user) {
    console.log("User already logged in");
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.contentContainer}>
            {/* Lock Icon */}
            <MaterialIcons
              name="lock"
              size={100}
              style={styles.icon}
              color="black"
            />

            {/* Title and Instructions */}
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Enter Verification Code</Text>
              <Text style={styles.subtitleText}>
                Enter the 6-digit code sent to {phoneNumber}.
              </Text>
            </View>

            {/* OTP Input Fields */}
            <OtpInput
              numberOfDigits={6}
              onTextChange={handleTextChange}
              focusColor="black"
              hideStick={true}
              theme={{
                pinCodeContainerStyle: styles.otpInput,
                pinCodeTextStyle: styles.pinCodeText,
              }}
            />

            {/* Confirm Button */}
            <TouchableOpacity
              style={[styles.confirmButton, loading && styles.disabledButton]}
              onPress={handleConfirm}
              disabled={loading}
            >
              <Text style={styles.confirmButtonText}>
                {loading ? "Sending Code...." : "Confirm"}
              </Text>
            </TouchableOpacity>

            {/* Resend OTP Text */}
            <Text style={[styles.subtitleText, { color: "black" }]}>
              Didn’t receive the code?{" "}
              <Text style={styles.resendText} onPress={resendOtp}>
                Resend
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  icon: {
    textAlign: "center",
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitleText: {
    marginVertical: 20,
    color: "rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    marginHorizontal: 6,
  },
  pinCodeText: {
    color: "black",
    fontSize: 18,
  },
  confirmButton: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5, // Makes the button look visually disabled
  },
  resendText: {
    color: "blue",
  },
});
