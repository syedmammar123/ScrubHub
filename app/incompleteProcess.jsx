import { View, Text, StatusBar, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import { theme } from "@/theme";
import UpperBar from "@/components/upperBar";

import StatusButton from "@/components/statusButton";
import StatusIcon from "@/components/statusIcon";
import { ScrollView } from "react-native-gesture-handler";
import IncompleteWordButtons from "@/components/incompleteWordButtons";

let processWords = [
  { val: "Glucose→", notknown: false },
  { val: "(Hexokinase)→", notknown: false },
  { val: "Glucose-6-Phosphate (G6P)→", notknown: false },
  { val: "", notknown: true },
  { val: "→Fructose-6-Phosphate (F6P)→", notknown: false },
  { val: "(Phosphofructokinase-1)→", notknown: false },
  { val: "Fructose-1,6-Bisphosphate (F1,6BP)→", notknown: false },
  { val: "(Aldolase)→", notknown: false },
  {
    val: "Dihydroxyacetone Phosphate (DHAP) + Glyceraldehyde-3-Phosphate (G3P)→",
    notknown: false,
  },
  { val: "", notknown: true },
  { val: "→1,3-Bisphosphoglycerate (1,3BPG) + NADH→", notknown: false },
  { val: "(Phosphoglycerate Kinase)→", notknown: false },
  { val: "3 - Phosphoglycerate (3PG) + ATP→", notknown: false },
  { val: "", notknown: true },
  { val: "→2 - Phosphoglycerate (2PG)→", notknown: false },
  { val: "(Enolase)→", notknown: false },
  { val: "Phosphoenolpyruvate (PEP)→", notknown: false },
  { val: "(Pyruvate Kinase)→", notknown: false },
  { val: "Pyruvate + ATP", notknown: false },
];

let incompleteProcessWords = [
  { val: "Phosphoglycerate Mutase → C", opacity: 1 },
  { val: "Glyceraldehyde-3-PhosphateDehydrogenase → B", opacity: 1 },
  { val: "Phosphoglucose Isomerase → A", opacity: 1 },
];

export default function IncompleteProcess() {
  const [selected, setSelected] = useState(-1);
  const [process, setProcess] = useState(processWords);
  const [words, setWords] = useState(incompleteProcessWords);
  console.log(words);
  const handlePress = (index) => {
    // setSelected(index);
    if (selected === index && process[index].val === "") {
      setSelected(-1);
    } else if (selected !== index && process[index].val === "") {
      setSelected(index);
    }

    if (process[index].val !== "") {
      console.log("DROP BACK");
      const wordIndex = words.findIndex(
        (word) => word.val === process[index].val
      );
      setWords((prev) => {
        const updatedWord = [...prev];
        updatedWord[wordIndex] = { ...updatedWord[wordIndex], opacity: 1 };
        return updatedWord;
      });
      setProcess((prev) => {
        const updatedProcess = [...prev];
        updatedProcess[index] = { ...updatedProcess[index], val: "" };
        return updatedProcess;
      });
    }

    // if (selected === -1) {
    //   setSelected(index);
    // } else if(selected ===index) {
    //   setSelected(-1);
    // }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackButton />
      {/* Status Of Questions BAR */}
      <UpperBar />

      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <ScrollView
            style={{
              flex: 1,

              width: "95%",
              alignSelf: "center",
            }}
          >
            {/* UPPER CONTAINER */}
            <View
              style={{
                width: "100%",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              {/* Guideline */}
              <View>
                <Text style={styles.Text}>
                  Given an incomplete flowchart of a process that occurs in the
                  human body or in a disease, complete the missing parts of the
                  flowchart by dragging the answer choices to their correct
                  position
                </Text>
              </View>

              {/* Hint */}
              <View>
                <Text style={styles.hint}>
                  What is the sequence of glycolysis? Complete the missing step
                  in the diagram using the choices below:
                </Text>
              </View>

              {/* Process */}
              <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {process.map((proc, index) => (
                    <View key={index}>
                      {!proc.notknown ? (
                        <Text style={styles.processText}>{proc.val}</Text>
                      ) : (
                        <View>
                          <Pressable
                            onPress={() => handlePress(index)}
                            style={[
                              styles.Blank,
                              {
                                backgroundColor:
                                  selected === index
                                    ? `${theme.barColor}`
                                    : `${theme.barBgColor}`,
                              },
                            ]}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: proc.val === "" ? 20 : 9,
                                textAlign: "center",
                              }}
                            >
                              {proc.val === "" ? "?" : proc.val}
                            </Text>
                          </Pressable>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              </View>
              {/* Buttons */}
              <View style={styles.wordsCotainer}>
                {words.map((word, index) => (
                  <IncompleteWordButtons
                    title={word.val}
                    selected={selected}
                    setProcess={setProcess}
                    setSelected={setSelected}
                    setWords={setWords}
                    index={index}
                    words={words}
                  />
                ))}
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
          </ScrollView>
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
  },
  hint: {
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 16,
    width: "95%",
    marginTop: 10,
    marginBottom: 20,
  },
  processText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 25,
  },
  Blank: {
    padding: 2,
    paddingHorizontal: 50,
    borderRadius: 20,
  },
  wordsCotainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
    columnGap: 2,
    marginTop: 10,
  },
  btncontainer: {
    paddingBottom: 40,
    width: "95%",
    alignSelf: "center",
  },
});
