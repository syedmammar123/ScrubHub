import CustomText from "@/components/CustomText";
import { ScrubButton } from "@/components/scrubButton";
import { ScrubImage } from "@/components/scrubImage";
import useCurrentUserStore from "@/store/currentUserStore";
import { theme } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";

export default function OnBoarding() {
  const router = useRouter();
  // const user = useCurrentUserStore((state) => state.user);
  const { user } = useCurrentUserStore((state) => state);

  console.log(console.log("onboarding par aya",user));
  
  if (user) {
    console.log("Oh shit user tou hai dear",user);
    return <Redirect href="/" />;
  }

  const handlePress = () => {
    router.navigate("/register");
    // router.navigate("/fbtest");
  };

  console.log(user);

  return (
    <LinearGradient
      colors={[theme.colorWhite, theme.colorWhite, theme.colorWhite]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrubImage />
      <View style={styles.buttonContainer}>
        <ScrubButton
          title="Get Started"
          onPress={handlePress}
          color={theme.colorBlack}
          width={"100%"}
        />
        <CustomText style={styles.termsText}>
          By signing up you agree to our{" "}
          <CustomText style={styles.highlightedText}>Terms</CustomText> and{" "}
          <CustomText style={styles.highlightedText}>Privacy Policy</CustomText>
          . We protect your personal data.
        </CustomText>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },

  buttonContainer: {
    alignItems: "center",
    width: "85%",
    marginTop: -20,
    marginBottom: -40,
  },
  termsText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 30,
    fontWeight: "500",
    width: "95%",
    fontFamily: "Poppins-Regular",
  },
  highlightedText: {
    color: "red",
    fontWeight: "bold",
  },
});
