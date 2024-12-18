import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import ScrubLogo from "@/components/scrubLogo";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import { theme } from "@/theme";
import QuestionOption from "@/components/questionOption";
import StatusButton from "@/components/statusButton";

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
          <View style={{ marginTop: 30 }}>
            <StatusButton
              // setError={setError}
              // selected={selected}
              text={"Continue"}
              width={"60%"}
            />
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
