// import {
//   View,
//   Text,
//   StyleSheet,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Platform,
//   Keyboard,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState } from "react";
// import BackButton from "@/components/backButton";
// import { savedStyles, theme } from "@/theme";
// import NumberInput from "@/components/numberInput";
// import DropDownButton from "@/components/dropDownButton";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import CountryPickerModal from "@/components/countryPickerModal";
// import { router } from "expo-router";
// import { StatusBar } from "expo-status-bar";

// export default function Register() {
//   const [dropDownActive, setDropDownActive] = useState(false);

//   const [countryCode, setCountryCode] = useState("+1");
//   return (
//     <View style={styles.container}>
//       <StatusBar style="auto" />
//       {/* <BackButton /> */}
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.inviteFriendContainer}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={{ width: "90%" }}>
//             <MaterialIcons
//               name="mobile-friendly"
//               size={100}
//               style={{ textAlign: "center", marginBottom: 20 }}
//               color="black"
//             />
//             <View style={styles.titleinviteFriend}>
//               <Text style={styles.titleText}>Enter mobile number</Text>
//               <Text style={styles.subtitleText}>
//                 Add your phone number. We'll send you a verification code so we
//                 know you're real.
//               </Text>
//             </View>
//             <View style={savedStyles.numberinviteFriend}>
//               {/* Dropdown */}
//               <DropDownButton
//                 setDropDownActive={setDropDownActive}
//                 countryCode={countryCode}
//               />
//               {/* Phone Input */}
//               <View style={{ flex: 1 }}>
//                 <NumberInput
//                   placeholderTextColor={"black"}
//                   bgColor="rgba(0,0,0,0.2)"
//                   color="black"
//                 />
//               </View>
//             </View>
//             <TouchableOpacity
//               style={styles.inviteButton}
//               onPress={() => router.navigate("/otpScreen")}
//             >
//               <Text style={styles.inviteButtonText}>Confirm</Text>
//             </TouchableOpacity>
//             <Text style={[styles.subtitleText, { color: "black" }]}>
//               By providing my phone number, I hereby agree and accept the Terms
//               of Service and Privacy Policy.
//             </Text>
//             <CountryPickerModal
//               setCountryCode={setCountryCode}
//               setDropDownActive={setDropDownActive}
//               dropDownActive={dropDownActive}
//             />
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colorWhite,
//   },
//   inviteFriendContainer: {
//     flex: 1,
//     alignItems: "center",
//     paddingHorizontal: 20,
//     justifyContent: "center",
//   },
//   titleinviteFriend: { alignItems: "center", marginBottom: 20 },
//   titleText: { fontSize: 28, textAlign: "center", fontWeight: "bold" },
//   subtitleText: {
//     marginVertical: 20,
//     color: "rgba(0,0,0,0.3)",
//     fontWeight: "black",
//     textAlign: "center",
//   },
//   numberinviteFriend: {
//     flexDirection: "row",
//     alignItems: "center",
//     columnGap: 20,
//     marginBottom: 20,
//   },

//   inviteButton: {
//     width: "100%",
//     backgroundColor: "black",
//     paddingVertical: 15,
//     borderRadius: 5,
//   },
//   inviteButtonText: {
//     color: "white",
//     textAlign: "center",
//     fontSize: 15,
//     fontWeight: "bold",
//   },
// });

// // import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
// // import React, { useState, useEffect } from "react";
// // import { Button, TextInput } from "react-native";
// // import auth from "@react-native-firebase/auth";
// // import { usePathname, useRouter } from "expo-router";

// // export default function Register() {
// //   const pathname = usePathname();
// //   const router = useRouter();
// //   console.log("auth", auth().currentUser);
// //   useEffect(() => {
// //     console.log("auth", auth().currentUser);
// //   }, []);

// //   const [initializing, setInitializing] = useState(true);
// //   const [user, setUser] = useState();
// //   const [confirm, setConfirm] = useState(null);
// //   const [code, setCode] = useState("");

// //   // Handle user state changes
// //   function onAuthStateChanged(user) {
// //     setUser(user);
// //     if (initializing) setInitializing(false);
// //   }

// //   const handlePress = () => {
// //     // router.navigate("/register");
// //     auth().signOut();
// //     router.navigate("/register");
// //   };

// //   useEffect(() => {
// //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
// //     return subscriber; // unsubscribe on unmount
// //   }, []);

// //   useEffect(() => {
// //     if (pathname == "/firebaseauth/link") router.back();
// //   }, [pathname]);

// //   // Handle the button press
// //   async function signInWithPhoneNumber(phoneNumber) {
// //     console.log("phoneNumber", phoneNumber);
// //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
// //     console.log("confirmation", confirmation);
// //     setConfirm(confirmation);
// //   }

// //   async function confirmCode() {
// //     try {
// //       await confirm.confirm(code);
// //     } catch (error) {
// //       console.log("Invalid code.");
// //     }
// //   }

// //   if (initializing) return null;

// //   if (!user) {
// //     if (!confirm) {
// //       return (
// //         <SafeAreaView style={{ marginBottom: 30 }}>
// //           <TouchableOpacity
// //             onPress={() => signInWithPhoneNumber("+92 111-111-1111")}
// //             style={{ borderColor: "red", borderWidth: 1, marginTop: 100 }}
// //           >
// //             <Text>Sign In</Text>
// //           </TouchableOpacity>
// //         </SafeAreaView>
// //       );
// //     }

// //     return (
// //       <SafeAreaView>
// //         <TextInput
// //           value={code}
// //           onChangeText={(text) => setCode(text)}
// //           style={{ borderColor: "red", borderWidth: 1 }}
// //         />
// //         <Button title="Confirm Code" onPress={() => confirmCode()} />
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <SafeAreaView>
// //       <Text>Welcome {user.email}</Text>
// //       <Button title="Sign Out" onPress={handlePress} />
// //     </SafeAreaView>
// //   );
// // }

// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity } from "react-native";
// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";
// import { useNavigation } from "@react-navigation/native";

// export default function Register() {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [code, setCode] = useState("");
//   const [confirm, setConfirm] = useState(null);
//   v

//   // Function to send verification code
//   const signInWithPhoneNumber = async () => {
//     try {
//       const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//       setConfirm(confirmation);
//     } catch (error) {
//       console.log("Error sending code: ", error);
//     }
//   };

//   // // Function to verify code and check user in Firestore
//   // const confirmCode = async () => {
//   //   try {
//   //     const result = await confirm.confirm(code);
//   //     const user = result.user;

//   //     const userDocument = await firestore()
//   //       .collection("users")
//   //       .doc(user.uid)
//   //       .get();

//   //     if (userDocument.exists) {
//   //       // User exists, navigate to Dashboard
//   //       navigation.navigate("otpScreen");
//   //     } else {
//   //       // User is new, navigate to Detail
//   //       navigation.navigate("otpScreen", { uid: user.uid });
//   //     }
//   //   } catch (error) {
//   //     console.log("Invalid code.", error);
//   //   }
//   // };
//   const confirmCode = async () => {
//   try {
//     const result = await confirm.confirm(code);
//     const user = result.user;

//     // Directly navigate to the desired screen
//     navigation.navigate("otpScreen", { uid: user.uid });
//   } catch (error) {
//     console.log("Invalid code.", error);
//   }
// };

//   return (
//     <View style={{ flex: 1, padding: 10, backgroundColor: "#BEBDB8" }}>
//       <Text
//         style={{
//           fontSize: 32,
//           fontWeight: "bold",
//           marginBottom: 40,
//           marginTop: 150,
//           textAlign: "center",
//         }}
//       >
//         Phone Number Authentication Using Firebase
//       </Text>

//       {/* If confirmation code is not sent */}
//       {!confirm ? (
//         <>
//           <Text
//             style={{
//               marginBottom: 20,
//               fontSize: 18,
//             }}
//           >
//             Enter your phone number:
//           </Text>

//           <TextInput
//             style={{
//               height: 50,
//               width: "100%",
//               borderColor: "black",
//               borderWidth: 1,
//               marginBottom: 30,
//               paddingHorizontal: 10,
//             }}
//             placeholder="e.g., +1 650-555-3434"
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//           />

//           <TouchableOpacity
//             onPress={signInWithPhoneNumber}
//             style={{
//               backgroundColor: "#841584",
//               padding: 10,
//               borderRadius: 5,
//               marginBottom: 20,
//               alignItems: "center",
//             }}
//           >
//             <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
//               Send Code
//             </Text>
//           </TouchableOpacity>
//         </>
//       ) : (
//         <>
//           <Text
//             style={{
//               marginBottom: 20,
//               fontSize: 18,
//             }}
//           >
//             Enter the code sent to your phone:
//           </Text>

//           <TextInput
//             style={{
//               height: 50,
//               width: "100%",
//               borderColor: "black",
//               borderWidth: 1,
//               marginBottom: 30,
//               paddingHorizontal: 10,
//             }}
//             placeholder="Enter code"
//             value={code}
//             onChangeText={setCode}
//           />

//           <TouchableOpacity
//             onPress={confirmCode}
//             style={{
//               backgroundColor: "#841584",
//               padding: 10,
//               borderRadius: 5,
//               marginBottom: 20,
//               alignItems: "center",
//             }}
//           >
//             <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
//               Confirm Code
//             </Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// }
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import DropDownButton from "@/components/dropDownButton";
import NumberInput from "@/components/numberInput";
import CountryPickerModal from "@/components/countryPickerModal";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const [dropDownActive, setDropDownActive] = useState(false);
  const [countryCode, setCountryCode] = useState("+92");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();

  const handlePhoneNumberChange = (value) => {
    console.log(value, "num");
    setPhoneNumber(value);
  };

  const handleConfirm = () => {
    // Check if phone number is valid
    if (phoneNumber.length == 10) {
      // Store the phone number and country code to use later for OTP
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      // Pass the full phone number to the OTP screen
      // router.push({
      //   pathname: "/otpScreen",
      //   params: { phoneNumber: fullPhoneNumber },
      // });
      navigation.navigate("otpScreen", { phoneNumber: fullPhoneNumber });
      console.log(fullPhoneNumber, "ph");
    } else {
      console.log(phoneNumber, "ph");
      // Alert.alert('Please enter a valid phone number.');

      alert("Please enter a valid phone number.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inviteFriendContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ width: "90%" }}>
            <MaterialIcons
              name="mobile-friendly"
              size={100}
              style={{ textAlign: "center", marginBottom: 20 }}
              color="black"
            />
            <View style={styles.titleinviteFriend}>
              <Text style={styles.titleText}>Enter mobile number</Text>
              <Text style={styles.subtitleText}>
                Add your phone number. We'll send you a verification code so we
                know you're real.
              </Text>
            </View>
            <View style={styles.numberinviteFriend}>
              <DropDownButton
                setDropDownActive={setDropDownActive}
                countryCode={countryCode}
              />
              <View style={{ flex: 1 }}>
                <NumberInput
                  placeholderTextColor={"black"}
                  bgColor="rgba(0,0,0,0.2)"
                  color="black"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.inviteButton}
              onPress={handleConfirm}
            >
              <Text style={styles.inviteButtonText}>Confirm</Text>
            </TouchableOpacity>
            <Text style={[styles.subtitleText, { color: "black" }]}>
              By providing my phone number, I hereby agree and accept the Terms
              of Service and Privacy Policy.
            </Text>
            <CountryPickerModal
              setCountryCode={setCountryCode}
              setDropDownActive={setDropDownActive}
              dropDownActive={dropDownActive}
            />
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
  inviteFriendContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  titleinviteFriend: { alignItems: "center", marginBottom: 20 },
  titleText: { fontSize: 28, textAlign: "center", fontWeight: "bold" },
  subtitleText: {
    marginVertical: 20,
    color: "rgba(0,0,0,0.3)",
    fontWeight: "black",
    textAlign: "center",
  },
  numberinviteFriend: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginBottom: 20,
  },
  inviteButton: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 5,
  },
  inviteButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
