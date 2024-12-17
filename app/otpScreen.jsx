// import {
//   View,
//   Text,
//   StyleSheet,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Platform,
//   Keyboard,
//   TouchableOpacity,
//   TextInput,
// } from "react-native";
// import React, { useState } from "react";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { router } from "expo-router";
// import { StatusBar } from "expo-status-bar";

// export default function OtpScreen() {
//   const [otp, setOtp] = useState(["", "", "", ""]);

//   const handleOtpChange = (value, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Move to next input automatically
//     if (value && index < 3) {
//       const nextInput = document.getElementById(`otp-input-${index + 1}`);
//       nextInput?.focus();
//     }
//   };

//   const handleConfirm = () => {
//     const otpCode = otp.join("");
//     console.log("Entered OTP:", otpCode);
//     // Add your OTP verification logic here
//     router.navigate("/");
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar style="auto" />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.otpContainer}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={{ width: "90%" }}>
//             <MaterialIcons
//               name="lock"
//               size={100}
//               style={{ textAlign: "center", marginBottom: 20 }}
//               color="black"
//             />
//             <View style={styles.titleContainer}>
//               <Text style={styles.titleText}>Enter Verification Code</Text>
//               <Text style={styles.subtitleText}>
//                 Enter the 4-digit code sent to your phone.
//               </Text>
//             </View>

//             <View style={styles.otpInputContainer}>
//               {otp.map((digit, index) => (
//                 <TextInput
//                   key={index}
//                   id={`otp-input-${index}`}
//                   style={styles.otpInput}
//                   keyboardType="numeric"
//                   maxLength={1}
//                   value={digit}
//                   onChangeText={(value) => handleOtpChange(value, index)}
//                 />
//               ))}
//             </View>

//             <TouchableOpacity
//               style={styles.confirmButton}
//               onPress={handleConfirm}
//             >
//               <Text style={styles.confirmButtonText}>Confirm</Text>
//             </TouchableOpacity>

//             <Text style={[styles.subtitleText, { color: "black" }]}>
//               Didn’t receive the code? Resend.
//             </Text>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   otpContainer: {
//     flex: 1,
//     alignItems: "center",
//     paddingHorizontal: 20,
//     justifyContent: "center",
//   },
//   titleContainer: { alignItems: "center", marginBottom: 20 },
//   titleText: { fontSize: 28, textAlign: "center", fontWeight: "bold" },
//   subtitleText: {
//     marginVertical: 20,
//     color: "rgba(0,0,0,0.3)",
//     textAlign: "center",
//   },
//   otpInputContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   otpInput: {
//     width: 50,
//     height: 50,
//     borderWidth: 1,
//     borderColor: "rgba(0,0,0,0.3)",
//     borderRadius: 5,
//     textAlign: "center",
//     fontSize: 18,
//     backgroundColor: "rgba(0,0,0,0.05)",
//   },
//   confirmButton: {
//     width: "100%",
//     backgroundColor: "black",
//     paddingVertical: 15,
//     borderRadius: 5,
//   },
//   confirmButtonText: {
//     color: "white",
//     textAlign: "center",
//     fontSize: 15,
//     fontWeight: "bold",
//   },
// });

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
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";

export default function OtpScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Changed OTP length to 6
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const navigation = useNavigation();
  const route = useRoute();

  const inputRefs = useRef([]);

  useEffect(() => {
    const { phoneNumber } = route.params;
    console.log(phoneNumber);
    if (route.params?.phoneNumber) {
      setPhoneNumber(route.params.phoneNumber);
      signInWithPhoneNumber(route.params.phoneNumber); // Automatically call this to send OTP when the screen loads
    }
  }, [route.params?.phoneNumber]);

  // Function to send verification code
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
    console.log("resending");

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

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input automatically
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleConfirm = async () => {
    const otpCode = otp.join(""); // Join the OTP digits
    console.log(otpCode, confirm);

    try {
      // Confirm OTP using Firebase Auth
      if (confirm) {
        const result = await confirm.confirm(otpCode); // Verifying the OTP
        const user = result.user;
        console.log(user);

        router.navigate("/"); // Navigate to the appropriate screen based on the user details
      }
    } catch (error) {
      console.log("Invalid OTP code", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                  Enter the 6-digit code sent to {phoneNumber}.
                </Text>
              </View>

              <View style={styles.otpInputContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
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
                disabled={loading} // Disable button when loading
              >
                <Text style={styles.confirmButtonText}>
                  {loading ? "Sending Code..." : "Confirm"}
                </Text>
              </TouchableOpacity>

              <Text style={[styles.subtitleText, { color: "black" }]}>
                Didn’t receive the code?{" "}
                <Text style={{ color: "blue" }} onPress={resendOtp}>
                  Resend
                </Text>
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
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
