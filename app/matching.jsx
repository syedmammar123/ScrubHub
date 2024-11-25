import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import { theme } from "@/theme";
import UpperBar from "@/components/upperBar";

import StatusButton from "@/components/statusButton";
import StatusIcon from "@/components/statusIcon";
import MatchingButton from "@/components/matchingButton";

export default function Matching() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackButton />
      {/* Status Of Questions BAR */}
      <UpperBar />

      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              width: "95%",
              alignSelf: "center",
            }}
          >
            {/* UPPER CONTAINER */}
            <View style={{}}>
              {/* Guideline */}
              <View>
                <Text style={styles.Text}>
                  Given a set of four mirobes and a set of four treatments,
                  match the microbe to the first line treatment:
                </Text>
              </View>

              {/* Hint */}
              <View>
                <Text style={styles.heading}>Microbe First-Line Treatment</Text>
              </View>

              {/* Input Of Word  */}
              <View style={styles.matchablesContainer}>
                <Text style={styles.TextMatching}>
                  A. Methicillin-Resistant S. Aureus (MRSA)
                </Text>
                <Text style={styles.TextMatching}>
                  B. Streptococcus pneumoniae
                </Text>
                <Text style={styles.TextMatching}>
                  C. Clostridium difficile
                </Text>
                <Text style={styles.TextMatching}>
                  D. Neisseria meningitidis
                </Text>
              </View>

              <View style={styles.answerBtnContainer}>
                <MatchingButton title={"1. Vancomycin"} />
                <MatchingButton title={"2. Penicillin"} />
                <MatchingButton title={"3. Oral Vancomycin"} />
                <MatchingButton title={"4. Ceftriaxone"} />
              </View>
            </View>
            {/* LOWER CONTAINER */}
            <View>
              {/* Button */}
              <View style={styles.btncontainer}>
                <StatusIcon text={"Amazing!"} />
                <StatusButton text={"Continue"} />
              </View>
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
  Text: {
    fontWeight: "bold",

    textAlign: "left",
    fontSize: 17,
    marginTop: 20,
    alignSelf: "center",
  },
  heading: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    marginTop: 10,
  },
  matchablesContainer: {
    width: "42.5%",
    alignSelf: "left",
  },
  TextMatching: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 18,
    marginTop: 20,
  },
  answerBtnContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
  },
  inputContainer: {
    width: "95%",
    alignItems: "center",
    marginTop: 5,

    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    columnGap: 15,
  },

  lettersContainer: {
    width: "95%",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    columnGap: 14,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
  },
  btncontainer: {
    paddingBottom: 40,
    width: "95%",
    alignSelf: "center",
  },
});
