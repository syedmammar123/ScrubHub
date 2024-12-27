import { View, Text, StatusBar, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ScrubLogo from "@/components/scrubLogo";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import { theme } from "@/theme";
import QuestionOption from "@/components/questionOption";
import StatusButton from "@/components/statusButton";
import useQuesStore from "@/store/quesStore";
import UpperBar from "@/components/upperBar";
import StatusIcon from "@/components/statusIcon";

let bgColors = ["#0038FF", "#00C2FF", "#FF0000", "#9747FF"];

export default function fourOptQues() {
  const { currentIndex, questions } = useQuesStore((state) => state);
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackButton />
      <UpperBar />
      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <ScrubLogo />
          {submitted ? (
            <View>
              <Text>Loading..</Text>
            </View>
          ) : (
            <ScrollView style={{ paddingBottom: 20 }}>
              <View style={styles.mainContainer}>
                {/* Question */}
                <View style={styles.questionContainer}>
                  <Text style={styles.question}>
                    {questions[currentIndex]?.question}
                  </Text>
                </View>
                {/* OPTIONS */}
                <View style={styles.optionsContainer}>
                  {questions[currentIndex].options?.map((opt, index) => (
                    <QuestionOption
                      checked={checked}
                      key={index}
                      selected={selected}
                      setSelected={setSelected}
                      opacity={
                        !checked
                          ? 1
                          : opt === selected ||
                              opt === questions[currentIndex].answer
                            ? 1
                            : 0.4
                      }
                      bgColor={
                        !checked
                          ? selected === opt
                            ? "white"
                            : bgColors[index]
                          : opt !== questions[currentIndex].answer &&
                              opt !== selected
                            ? bgColors[index]
                            : selected === questions[currentIndex].answer
                              ? theme.barColor
                              : opt === questions[currentIndex].answer &&
                                  opt !== selected
                                ? theme.barColor
                                : "#EF5555"
                      }
                      Option={`${opt}`}
                    />
                  ))}
                </View>
              </View>
              <View style={{ rowGap: 15 }}>
                {error ? (
                  <StatusIcon icon="cancel" text={"No Option Selected!"} />
                ) : (
                  ""
                )}
                {checked && selected !== "" && !error ? (
                  <StatusIcon
                    icon={
                      selected === questions[currentIndex].answer
                        ? "correct"
                        : "cancel"
                    }
                    text={
                      selected === questions[currentIndex].answer
                        ? "Correct Answer!"
                        : "Wrong Answer!"
                    }
                  />
                ) : (
                  ""
                )}
                {checked ? (
                  <StatusButton
                    setError={setError}
                    selected={selected}
                    setSubmitted={setSubmitted}
                    setChecked={setChecked}
                    checked={checked}
                    text={"Continue"}
                    width={"60%"}
                  />
                ) : (
                  <StatusButton
                    setChecked={setChecked}
                    checked={checked}
                    setError={setError}
                    selected={selected}
                    setSubmitted={setSubmitted}
                    text={"Submit"}
                    width={"60%"}
                    questionType={"fourOpt"}
                  />
                )}
              </View>
            </ScrollView>
          )}
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
    flexDirection: "column",
  },
  questionContainer: {
    width: "90%",
  },
  question: {
    textAlign: "center",
    // fontWeight: "bold",
    fontSize: 15,
    // fontFamily: "Poppins-Regular",
  },
  optionsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 40,
  },
});
