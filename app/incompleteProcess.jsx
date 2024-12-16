import { View, Text, StatusBar, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import { theme } from "@/theme";
import UpperBar from "@/components/upperBar";

import StatusButton from "@/components/statusButton";
import StatusIcon from "@/components/statusIcon";
import { ScrollView } from "react-native-gesture-handler";

let process = [
  "Glucose→",
  "(Hexokinase)→",
  "Glucose-6-Phosphate (G6P)→",
  "",
  "→Fructose-6-Phosphate (F6P)→",
  "(Phosphofructokinase-1)→",
  "Fructose-1,6-Bisphosphate (F1,6BP)→",
  "(Aldolase)→",
  "Dihydroxyacetone Phosphate (DHAP) + Glyceraldehyde-3-Phosphate (G3P)→",
  "",
  "→1,3-Bisphosphoglycerate (1,3BPG) + NADH→",
  "(Phosphoglycerate Kinase)→",
  "3 - Phosphoglycerate (3PG) + ATP→",
  "",
  "→2 - Phosphoglycerate (2PG)→",
  "(Enolase)→",
  "Phosphoenolpyruvate (PEP)→",
  "(Pyruvate Kinase)→",
  "Pyruvate + ATP",
];

export default function IncompleteProcess() {
  const [selected, setSelected] = useState(-1);
  console.log(selected);

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
                  {process.map((value, index) => (
                    <View>
                      {value !== "" ? (
                        <Text key={index} style={styles.processText}>
                          {value}
                        </Text>
                      ) : (
                        <View>
                          <Pressable
                            onPress={() => setSelected(index)}
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
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                              ?
                            </Text>
                          </Pressable>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              </View>
              <View>
                <Text>Buttons</Text>
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
  btncontainer: {
    paddingBottom: 40,
    width: "95%",
    alignSelf: "center",
  },
});
