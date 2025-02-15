import React, { useEffect } from "react";
import { useState } from "react";
import { getRandomSolvedQuesArray } from "../util/getRandomItem";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const useGetSolvedQues = () => {
  const [solvedQues, setSolvedQues] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUserId = auth().currentUser?.uid;

  const fetchRandomQues = async () => {
    setLoading(true);
    try {
      // Get all document IDs from the Questions collection
      const topicRef = firestore().collection("Users").doc(currentUserId);
      const querySnapshot = await topicRef.get();
      const solvedTopics = querySnapshot.data().solvedTopics;
      // console.log("querySnapshot",solvedTopics)
      if (solvedTopics.length === 0 || solvedTopics === undefined) {
        console.log("No solved topics found in the Users collection.");
        return [];
      }
      const randomMainTopics = getRandomSolvedQuesArray(solvedTopics);

        console.log("randomMainTopics",randomMainTopics.length)
        console.log("randomMainTopics1",randomMainTopics)

      // Get random questions from each subtopic
      const randomQuestions = [];

      for (let i = 0; i < randomMainTopics.length; i++) {
        if (randomMainTopics[i].subTopic !== null) {
          const questionsRef = topicRef
            .collection("solved")
            .doc(randomMainTopics[i].topic)
            .collection(randomMainTopics[i].subTopic)
            .where("questionStyle", "==", randomMainTopics[i].type)
            .limit(1);
          const querySnapshot = await questionsRef.get();
          const questionDocs = querySnapshot.docs;
          randomQuestions.push(questionDocs[0].data());
        }
      }

      return randomQuestions;
      setSolvedQues(randomQuestions);
    } catch (error) {
      console.log("Error fetching random questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchRandomQues };
};

export default useGetSolvedQues;
