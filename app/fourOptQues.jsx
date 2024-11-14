import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import ScrubLogo from "@/components/scrubLogo";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import { theme } from "@/theme";
import QuestionOption from "@/components/questionOption";

export default function fourOptQues() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackButton />
      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <ScrubLogo />
          <View style={styles.mainContainer}>
            {/* Question */}
            <View style={styles.questionContainer}>
              <Text style={styles.question}>
                WHAT ARE THREE DIFFERENTIAL DIAGNOSES FOR FEVER AND RASH IN A
                6-YEAR-OLD?
              </Text>
            </View>
            {/* OPTIONS */}
            <View style={styles.optionsContainer}>
              <QuestionOption bgColor={"#0038FF"} Option={"A. EPIGLOTTITIS"} />
              <QuestionOption
                bgColor={"#00C2FF"}
                Option={"B. Croup (laryngotracheobronchitis)"}
              />
              <QuestionOption
                bgColor={"#FF0000"}
                Option={"C. Foreign body aspiration"}
              />
              <QuestionOption bgColor={"#9747FF"} Option={"D. Asthma"} />
            </View>
          </View>
        </BackgroundImage>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    flexDirection: "col",
  },
  questionContainer: {
    width: "90%",
  },
  question: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  optionsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 40,
  },
});
