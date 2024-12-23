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
  console.log(questions[currentIndex].answer);

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
                    {/* WHAT ARE THREE DIFFERENTIAL DIAGNOSES FOR FEVER AND RASH IN
                    A 6-YEAR-OLD? */}
                    {questions[currentIndex].question}
                  </Text>
                </View>
                {/* OPTIONS */}
                <View style={styles.optionsContainer}>
                  {questions[currentIndex].options?.map((opt, index) => (
                    <QuestionOption
                      checked={checked}
                      key={index}
                      setSelected={setSelected}
                      bgColor={selected === opt ? "white" : bgColors[index]}
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
    fontWeight: "bold",
    fontSize: 15,
  },
  optionsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 40,
  },
});

// import { View, Text, StatusBar, StyleSheet } from "react-native";
// import React, { useState } from "react";
// import ScrubLogo from "@/components/scrubLogo";
// import BackgroundImage from "@/components/backgroundImage";
// import BackButton from "@/components/backButton";
// import { theme } from "@/theme";
// import QuestionOption from "@/components/questionOption";
// import UpperBar from "@/components/upperBar";
// import useQuesStore from "@/store/quesStore";
// import StatusButton from "@/components/statusButton";

// export default function fourOptQues() {
//   const { questions, currentIndex } = useQuesStore((state) => state);
//   const [selected, setSelected] = useState("");
//   const [error, setError] = useState(null);

//   return (
//     <View style={styles.container}>
//       <StatusBar style="auto" />
//       <BackButton />
//       <UpperBar />
//       <View style={{ flex: 1 }}>
//         <BackgroundImage>
//           <ScrubLogo />
//           <View style={styles.mainContainer}>
//             {/* Question */}
//             <View style={styles.questionContainer}>
//               <Text style={styles.question}>
//                 {questions[currentIndex]?.question}
//               </Text>
//             </View>
//             {/* OPTIONS */}
//             <View style={styles.optionsContainer}>
//               <QuestionOption
//                 setSelected={setSelected}
//                 bgColor={"#0038FF"}
//                 Option={`${questions[currentIndex]?.options[0]}`}
//               />
//               <QuestionOption
//                 selected={selected}
//                 setSelected={setSelected}
//                 bgColor={"#00C2FF"}
//                 Option={`${questions[currentIndex]?.options[1]}`}
//               />
//               <QuestionOption
//                 setSelected={setSelected}
//                 bgColor={"#FF0000"}
//                 Option={`${questions[currentIndex]?.options[2]}`}
//               />
//               <QuestionOption
//                 setSelected={setSelected}
//                 bgColor={"#9747FF"}
//                 Option={`${questions[currentIndex]?.options[3]}`}
//               />
//             </View>
//             <View>
//               <Text style={{ color: "red", fontWeight: "bold" }}>
//                 {error ? "Select an Option to Continue!" : ""}
//               </Text>
//             </View>
//           </View>
//           <View style={{ marginTop: 30 }}>
//             <StatusButton
//               setError={setError}
//               selected={selected}
//               text={"Continue"}
//               width={"60%"}
//             />
//           </View>
//         </BackgroundImage>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colorWhite,
//     justifyContent: "center",
//   },
//   mainContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     marginTop: 10,
//     flexDirection: "column",
//   },
//   questionContainer: {
//     width: "90%",
//   },
//   question: {
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 15,
//   },
//   optionsContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "column",
//     marginTop: 40,
//   },
// });
