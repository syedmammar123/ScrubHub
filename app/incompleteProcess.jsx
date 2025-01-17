import { View, Text, StatusBar, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import { theme } from "@/theme";
import UpperBar from "@/components/upperBar";

import StatusButton from "@/components/statusButton";
import StatusIcon from "@/components/statusIcon";
import { ScrollView } from "react-native-gesture-handler";
import IncompleteWordButtons from "@/components/incompleteWordButtons";
import useQuesStore from "@/store/quesStore";
import { scale } from "react-native-size-matters";

// let processWords = [
//   { val: "Glucose→", notknown: false },
//   { val: "(Hexokinase)→", notknown: false },
//   { val: "Glucose-6-Phosphate (G6P)→", notknown: false },
//   { val: "", notknown: true },
//   { val: "→Fructose-6-Phosphate (F6P)→", notknown: false },
//   { val: "(Phosphofructokinase-1)→", notknown: false },
//   { val: "Fructose-1,6-Bisphosphate (F1,6BP)→", notknown: false },
//   { val: "(Aldolase)→", notknown: false },
//   {
//     val: "Dihydroxyacetone Phosphate (DHAP) + Glyceraldehyde-3-Phosphate (G3P)→",
//     notknown: false,
//   },
//   { val: "", notknown: true },
//   { val: "→1,3-Bisphosphoglycerate (1,3BPG) + NADH→", notknown: false },
//   { val: "(Phosphoglycerate Kinase)→", notknown: false },
//   { val: "3 - Phosphoglycerate (3PG) + ATP→", notknown: false },
//   { val: "", notknown: true },
//   { val: "→2 - Phosphoglycerate (2PG)→", notknown: false },
//   { val: "(Enolase)→", notknown: false },
//   { val: "Phosphoenolpyruvate (PEP)→", notknown: false },
//   { val: "(Pyruvate Kinase)→", notknown: false },
//   { val: "Pyruvate + ATP", notknown: false },
// ];

// let incompleteProcessWords = [
//   { val: "Phosphoglycerate Mutase → C", opacity: 1 },
//   { val: "Glyceraldehyde-3-PhosphateDehydrogenase → B", opacity: 1 },
//   { val: "Phosphoglucose Isomerase → A", opacity: 1 },
// ];

export default function IncompleteProcess() {
  //Question Fetch
  const {
    getCurrentQuestion,
    getReviewQuestion,
    getCurrentType,
    getChallengeQuestion,
  } = useQuesStore((state) => state);
  const [question, setQuestion] = useState({});

  // Process and Submission States
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(-1);
  const [process, setProcess] = useState([]);
  const [words, setWords] = useState([]);
  const [isMatchesCorrect, setIsMatchesCorrect] = useState(null);

  // State for showing final Answer Colors on screen
  const [wrongMatches, setWrongMatches] = useState([]);
  const [correctMatches, setCorrectMatches] = useState([]);
  const [isColorsSet, setIsColorsSet] = useState(false);

  console.log("ANSWERS", answers);

  const handlePress = (index) => {
    if (selected === index && process[index].val === "") {
      setSelected(-1);
    } else if (selected !== index && process[index].val === "") {
      setSelected(index);
    }

    if (process[index].val !== "") {
      console.log("DROP BACK");
      const wordIndex = words.findIndex(
        (word) => word.val === process[index].val,
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
      setAnswers((prev) => {
        const previous = [...prev];
        const foundIndex = previous.findIndex((obj) => obj.realIndex === index);
        previous[foundIndex] = { ...previous[foundIndex], val: "" };

        return previous;
      });
    }
  };

  useEffect(() => {
    // // PreProcessing of Process
    let question = {};
    if (
      getReviewQuestion()?.questionStyle === "flowChart" ||
      getCurrentQuestion()?.questionStyle === "flowChart" ||
      getChallengeQuestion()?.questionStyle === "flowChart"
    ) {
      if (getCurrentType() === "review") {
        question = getReviewQuestion();
        setQuestion(question);
      } else if (getCurrentType() === "study") {
        question = getCurrentQuestion();
        setQuestion(question);
      } else if (getCurrentType() === "challenge") {
        question = getChallengeQuestion();
        setQuestion(question);
      }
      const splitProcess = question.diagram.split("→");
      console.log(splitProcess);
      const transformedArray = splitProcess.map((item, index) => {
        if (item.includes("{")) {
          setAnswers((prevAnswers) => {
            const newObj = {
              val: "",
              realIndex: index,
            };
            return [...prevAnswers, newObj];
          });
          return { val: "", notknown: true };
        } else {
          return { val: item.trim(), notknown: false };
        }
      });
      setProcess(transformedArray);

      const optionsArray = question.options.map((item) => {
        return { val: item, opacity: 1 };
      });

      setWords(optionsArray);
    }
  }, []);

  //Checking After Submission
  useEffect(() => {
    if (checked) {
      const correctAnswersfromDB = question.correctAnswers;

      const correctKeys = Object.keys(question.correctAnswers).sort();
      const correctAns = correctKeys.map((key) => correctAnswersfromDB[key]);

      console.log(correctKeys);
      console.log(correctAns);

      let wrongAnswers = [];
      let correctAnswers = [];
      let flag = true;
      answers.map((item, index) => {
        if (item.val !== correctAns[index]) {
          flag = false;

          correctAnswers.push({
            value: correctAns[index],
            option: correctKeys[index],
          });
        } else {
          wrongAnswers.push(item.val);
        }
      });
      console.log(wrongAnswers);
      console.log(correctAnswers);

      setWrongMatches(wrongAnswers);
      setCorrectMatches(correctAnswers);
      setWords((prev) => {
        const updatedWords = prev.map((word) =>
          correctAnswers.some((item) => item.value === word.val)
            ? { ...word, opacity: 1 }
            : { ...word, opacity: 0.5 },
        );
        return updatedWords;
      });
      if (flag) {
        setIsMatchesCorrect(true);
      } else {
        setIsMatchesCorrect(false);
      }
      setIsColorsSet(true);
    }
  }, [checked]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackButton />
      {/* Status Of Questions BAR */}
      <UpperBar />

      <View style={{ flex: 1 }}>
        <BackgroundImage>
          {submitted ? (
            <View>
              <Text>Loading..</Text>
            </View>
          ) : (
            <>
              <ScrollView
                style={{
                  flexGrow: 1,
                  width: "95%",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    height: scale(650),
                  }}
                >
                  {/* UPPER CONTAINER */}
                  <View
                    style={{
                      width: "100%",
                      flex: 1,
                      rowGap: scale(40),
                    }}
                  >
                    {/* Guideline */}
                    <View>
                      <View>
                        <Text style={styles.Text}>
                          Given an incomplete flowchart of a process that occurs
                          in the human body or in a disease, complete the
                          missing parts of the flowchart by dragging the answer
                          choices to their correct position
                        </Text>
                      </View>

                      {/* Hint */}
                      <View>
                        <Text style={styles.hint}>
                          What is the sequence of glycolysis? Complete the
                          missing step in the diagram using the choices below:
                        </Text>
                      </View>
                    </View>

                    {/* Process */}

                    <View
                      style={{
                        width: "90%",
                        alignSelf: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          rowGap: 6,
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {(() => {
                          let notknown = [];
                          process.forEach((proc, index) => {
                            if (proc.notknown) {
                              notknown.push(index);
                            }
                          });
                          return process.map((proc, index) => (
                            <View style={{ flexDirection: "row" }} key={index}>
                              {!proc.notknown ? (
                                <Text style={styles.processText}>
                                  {proc.val}
                                </Text>
                              ) : (
                                <View>
                                  <Pressable
                                    disabled={isColorsSet}
                                    onPress={() => {
                                      handlePress(index);
                                    }}
                                    style={[
                                      styles.Blank,
                                      {
                                        backgroundColor: !isColorsSet
                                          ? selected === index
                                            ? `${theme.barColor}`
                                            : `${theme.barBgColor}`
                                          : wrongMatches.includes(proc.val)
                                            ? theme.barColor
                                            : "#EF5555",
                                      },
                                    ]}
                                  >
                                    <Text
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: proc.val === "" ? 15 : 9,
                                        textAlign: "center",
                                      }}
                                    >
                                      {proc.val === ""
                                        ? String.fromCharCode(
                                            65 + notknown.indexOf(index),
                                          )
                                        : proc.val}
                                    </Text>
                                  </Pressable>
                                </View>
                              )}
                              <Text>
                                {" "}
                                {index !== process.length - 1 && "→"}{" "}
                              </Text>
                            </View>
                          ));
                        })()}
                      </View>
                    </View>
                    {/* Buttons */}
                    <View style={styles.wordsCotainer}>
                      {words.map((word, index) => (
                        <IncompleteWordButtons
                          bgColor={
                            !isColorsSet
                              ? "#ffffff"
                              : correctMatches.some(
                                    (item) => item.value === word.val,
                                  )
                                ? theme.barColor
                                : "#ffffff"
                          }
                          setAnswers={setAnswers}
                          key={index}
                          opacity={word.opacity}
                          title={
                            !isColorsSet
                              ? word.val
                              : correctMatches.some(
                                    (item) => item.value === word.val,
                                  )
                                ? `${word.val + "→ " + correctMatches[correctMatches.findIndex((item) => item.value === word.val)].option}`
                                : word.val
                          }
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
                    <View
                      style={[
                        styles.btncontainer,
                        { rowGap: 10, marginTop: 60 },
                      ]}
                    >
                      {error ? (
                        <StatusIcon
                          icon="cancel"
                          text={"All Boxes should be filled!"}
                        />
                      ) : (
                        ""
                      )}
                      {checked && !error ? (
                        <StatusIcon
                          icon={isMatchesCorrect ? "correct" : "cancel"}
                          text={
                            isMatchesCorrect ? "Amazing!" : "Wrong Matches!"
                          }
                        />
                      ) : (
                        ""
                      )}
                      {checked ? (
                        <StatusButton
                          scoreIncrease={isMatchesCorrect}
                          setError={setError}
                          selected={answers}
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
                          selected={answers}
                          setSubmitted={setSubmitted}
                          text={"Submit"}
                          questionType={"incomplete"}
                          width={"60%"}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </ScrollView>
            </>
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
//
