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
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import DropDownButton from "@/components/dropDownButton";
import NumberInput from "@/components/numberInput";
import CountryPickerModal from "@/components/countryPickerModal";
import { useNavigation } from "@react-navigation/native";
import useCurrentUserStore from "@/store/currentUserStore";
import CustomText from "@/components/CustomText";

export default function Register() {
  const [dropDownActive, setDropDownActive] = useState(false);
  const [countryCode, setCountryCode] = useState("+92");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const user = useCurrentUserStore((state) => state.user);

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

  if (user) {
    return <Redirect href="/" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
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
              <CustomText style={styles.titleText}>
                Enter mobile number
              </CustomText>
              <CustomText style={styles.subtitleText}>
                Add your phone number. We'll send you a verification code so we
                know you're real.
              </CustomText>
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
              <CustomText style={styles.inviteButtonText}>Confirm</CustomText>
            </TouchableOpacity>
            {/* <CustomText style={[styles.subtitleText, { color: "black" }]}>
              By providing my phone number, I hereby agree and accept the Terms
              of Service and Privacy Policy.
            </CustomText> */}

            <CustomText style={[styles.subtitleText, { color: "black" }]}>
              By providing my phone number, I hereby agree and accept the { }
              <CustomText 
                style={styles.highlightedText} 
                onPress={() => Linking.openURL('https://scrubhub1234.github.io/scrubhub-ploicy/')}>
                Privacy Policy
              </CustomText>.
            </CustomText>
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
  titleText: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Poppins-Regular",
  },
  subtitleText: {
    marginVertical: 20,
    color: "rgba(0,0,0,0.3)",
    fontWeight: "black",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
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
    fontFamily: "Poppins-Regular",
  },
   highlightedText: {
    color: "red",
    fontWeight: "bold",
  },
});
