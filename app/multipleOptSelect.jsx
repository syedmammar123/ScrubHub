import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
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
import CustomText from "@/components/CustomText";

let bgColors = ["#0038FF", "#00C2FF", "#FFA500", "#9747FF"];

export default function MultipleOptSelect() {
  //Question Fetch
  const {
    getReviewQuestion,
    getCurrentQuestion,
    getCurrentType,
    getChallengeQuestion,
    getFriendChallengeQuestion,
    getChallengingFriendsQuestion,
  } = useQuesStore((state) => state);

  const [question, setQuestion] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(null);
  const [correctOptions, setCorrectOptions] = useState([]);
  const [isMatchesCorrect, setIsMatchesCorrect] = useState(null);

  console.log("CHECKED", checked);

  useEffect(() => {
    let q = {};
    if (
      getReviewQuestion()?.questionStyle === "medicationUse" ||
      getCurrentQuestion()?.questionStyle === "medicationUse" ||
      getChallengeQuestion()?.questionStyle === "medicationUse" ||
      getFriendChallengeQuestion()?.questionStyle === "medicationUse" ||
      getChallengingFriendsQuestion()?.questionStyle === "medicationUse"
    ) {
      if (getCurrentType() === "review") {
        q = getReviewQuestion();
        setQuestion(q);
      } else if (getCurrentType() === "study") {
        q = getCurrentQuestion();
        setQuestion(q);
      } else if (getCurrentType() === "challenge") {
        q = getChallengeQuestion();
        setQuestion(q);
      } else if (getCurrentType() === "friendchallenge") {
        q = getFriendChallengeQuestion();
        setQuestion(q);
      } else if (getCurrentType() === "ChallengingFriends") {
        q = getChallengingFriendsQuestion();
        setQuestion(q);
      }
    }
    const correctAnswers = q.options.reduce((indices, opt, index) => {
      if (opt.isCorrect) {
        indices.push(index);
      }
      return indices;
    }, []);
    setCorrectOptions(correctAnswers);
  }, []);

  useEffect(() => {
    if (checked) {
      const areMatchesCorrect = correctOptions.every(
        (value, index) => value === selected[index]
      );

      if (!areMatchesCorrect) {
        setIsMatchesCorrect(false);
      } else {
        setIsMatchesCorrect(true);
      }
    }
  }, [checked]);

  if (submitted)
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <View
          style={{
            marginTop: 100,
          }}
        >
          <BackgroundImage>
            <ScrubLogo type={null} />
            <View
              style={{
                marginTop: 150,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator
                style={styles.loadingIndicator}
                size={"large"}
                color={theme.barColor}
              />
            </View>
          </BackgroundImage>
        </View>
      </View>
    );
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <BackButton />
      <UpperBar />
      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <ScrubLogo type={!checked ? null : isMatchesCorrect} />

          <ScrollView style={{ paddingBottom: 40 }}>
            <View style={styles.mainContainer}>
              {/* Question */}
              <View style={styles.questionContainer}>
                <CustomText style={styles.question}>
                  {question?.description}
                </CustomText>
                <CustomText style={[styles.question, { fontSize: 20 }]}>
                  "{question?.name}"
                </CustomText>
              </View>
              {/* OPTIONS */}
              <View style={styles.optionsContainer}>
                {question?.options?.map((opt, index) => (
                  <QuestionOption
                    checked={checked}
                    index={index}
                    opacity={!checked ? 1 : 0.4}
                    bgColor={
                      !checked
                        ? selected.includes(index)
                          ? "white"
                          : bgColors[index % bgColors.length]
                        : (selected.includes(index) &&
                              correctOptions.includes(index)) ||
                            (!selected.includes(index) &&
                              correctOptions.includes(index))
                          ? theme.barColor
                          : selected.includes(index) &&
                              !correctOptions.includes(index)
                            ? "#EF5555"
                            : bgColors[index % bgColors.length]
                    }
                    key={index}
                    setSelected={setSelected}
                    Option={`${opt.option}`}
                  />
                ))}
              </View>
            </View>
            <View style={{ rowGap: 15, paddingBottom: 40 }}>
              {error ? (
                <StatusIcon icon="cancel" text={"No Option Selected!"} />
              ) : (
                ""
              )}
              {checked && !error ? (
                <StatusIcon
                  icon={isMatchesCorrect ? "correct" : "cancel"}
                  text={
                    isMatchesCorrect
                      ? "Correct Selections!"
                      : "Wrong Selections!"
                  }
                />
              ) : (
                ""
              )}
              {checked ? (
                <StatusButton
                  setError={setError}
                  scoreIncrease={isMatchesCorrect}
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
                  questionType={"multipleOpt"}
                  width={"60%"}
                />
              )}
            </View>
          </ScrollView>
          {/* )} */}
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
    rowGap: 5,
  },
  question: {
    textAlign: "center",
    // fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Poppins-Semi",
  },
  optionsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 20,
  },
});
