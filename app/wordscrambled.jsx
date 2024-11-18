import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import { theme } from "@/theme";
import UpperBar from "@/components/upperBar";
import InputBox from "@/components/inputBox";
import BlankInput from "@/components/blankInput";
import StatusButton from "@/components/statusButton";
import StatusIcon from "@/components/statusIcon";

export default function WordScrambled() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackButton />
      {/* Status Of Questions BAR */}
      <UpperBar />

      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            {/* UPPER CONTAINER */}
            <View>
              {/* Guideline */}
              <View>
                <Text style={styles.guideline}>
                  Given a hint with a series of empty spaces and 14 letter
                  options, find out which word/term is being hinted at
                </Text>
              </View>

              {/* Hint */}
              <View>
                <Text style={styles.guideline}>
                  Process of converting glucose to energy.
                </Text>
              </View>

              {/* Input Of Word  */}
              <View style={styles.inputContainer}>
                <BlankInput />
                <BlankInput />
                <BlankInput />
                <BlankInput />
                <BlankInput />
                <BlankInput />
                {/* <InputBox />
                <InputBox />
                <InputBox />
                <InputBox />
                <InputBox />
                <InputBox />
                <InputBox />
                <InputBox />
                <InputBox />
                <InputBox />
                <InputBox />
                <InputBox />
                <InputBox /> */}
              </View>

              {/* Letters to Choose */}
              <View style={styles.lettersContainer}>
                <InputBox letter="A" />
                <InputBox letter="S" />
                <InputBox letter="I" />
                <InputBox letter="E" />
                <InputBox letter="N" />
                <InputBox letter="O" />
                <InputBox letter="C" />
                <InputBox letter="R" />
                <InputBox letter="T" />
                <InputBox letter="E" />
                <InputBox letter="I" />
                <InputBox letter="U" />
                <InputBox letter="P" />
                <InputBox letter="R" />
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
  guideline: {
    fontWeight: "bold",
    width: "95%",
    textAlign: "left",
    fontSize: 17,
    marginTop: 20,
    alignSelf: "center",
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
