import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import BackButton from "@/components/backButton";
import { savedStyles, theme } from "@/theme";
import NumberInput from "@/components/numberInput";
import DropDownButton from "@/components/dropDownButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CountryPickerModal from "@/components/countryPickerModal";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Register() {
  const [dropDownActive, setDropDownActive] = useState(false);

  const [countryCode, setCountryCode] = useState("+1");
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <BackButton /> */}
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
            <View style={savedStyles.numberinviteFriend}>
              {/* Dropdown */}
              <DropDownButton
                setDropDownActive={setDropDownActive}
                countryCode={countryCode}
              />
              {/* Phone Input */}
              <View style={{ flex: 1 }}>
                <NumberInput
                  placeholderTextColor={"black"}
                  bgColor="rgba(0,0,0,0.2)"
                  color="black"
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.inviteButton}
              onPress={() => router.navigate("/otpScreen")}
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
    backgroundColor: theme.colorWhite,
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


// import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
// import React, { useState, useEffect } from "react";
// import { Button, TextInput } from "react-native";
// import auth from "@react-native-firebase/auth";
// import { usePathname, useRouter } from "expo-router";

// export default function Register() {
//   const pathname = usePathname();
//   const router = useRouter();
//   console.log("auth", auth().currentUser);
//   useEffect(() => {
//     console.log("auth", auth().currentUser);
//   }, []);

//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();
//   const [confirm, setConfirm] = useState(null);
//   const [code, setCode] = useState("");

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   const handlePress = () => {
//     // router.navigate("/register");
//     auth().signOut();
//     router.navigate("/register");
//   };

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   useEffect(() => {
//     if (pathname == "/firebaseauth/link") router.back();
//   }, [pathname]);

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     console.log("phoneNumber", phoneNumber);
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     console.log("confirmation", confirmation);
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//     } catch (error) {
//       console.log("Invalid code.");
//     }
//   }

//   if (initializing) return null;

//   if (!user) {
//     if (!confirm) {
//       return (
//         <SafeAreaView style={{ marginBottom: 30 }}>
//           <TouchableOpacity
//             onPress={() => signInWithPhoneNumber("+92 111-111-1111")}
//             style={{ borderColor: "red", borderWidth: 1, marginTop: 100 }}
//           >
//             <Text>Sign In</Text>
//           </TouchableOpacity>
//         </SafeAreaView>
//       );
//     }

//     return (
//       <SafeAreaView>
//         <TextInput
//           value={code}
//           onChangeText={(text) => setCode(text)}
//           style={{ borderColor: "red", borderWidth: 1 }}
//         />
//         <Button title="Confirm Code" onPress={() => confirmCode()} />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView>
//       <Text>Welcome {user.email}</Text>
//       <Button title="Sign Out" onPress={handlePress} />
//     </SafeAreaView>
//   );
// }
