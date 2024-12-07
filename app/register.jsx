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
