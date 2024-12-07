import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function OtpScreen() {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input automatically
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleConfirm = () => {
    const otpCode = otp.join("");
    console.log("Entered OTP:", otpCode);
    // Add your OTP verification logic here
    router.navigate("/");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.otpContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ width: "90%" }}>
            <MaterialIcons
              name="lock"
              size={100}
              style={{ textAlign: "center", marginBottom: 20 }}
              color="black"
            />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Enter Verification Code</Text>
              <Text style={styles.subtitleText}>
                Enter the 4-digit code sent to your phone.
              </Text>
            </View>

            <View style={styles.otpInputContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  id={`otp-input-${index}`}
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>

            <Text style={[styles.subtitleText, { color: "black" }]}>
              Didn’t receive the code? Resend.
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  otpContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  titleContainer: { alignItems: "center", marginBottom: 20 },
  titleText: { fontSize: 28, textAlign: "center", fontWeight: "bold" },
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
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  confirmButton: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
