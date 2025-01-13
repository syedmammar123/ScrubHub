import React, { useEffect } from "react";
import { useState } from "react";
import { types, getRandomArray, getRandomItem } from "../util/getRandomItem";
import firestore from "@react-native-firebase/firestore";

const useGetRandomQues = () => {
  const [randomQues, setRandomQues] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRandomQues = async () => {
    setLoading(true);
    try {
      // Get all document IDs from the Questions collection
      const topicRef = firestore().collection("Topics");
      const querySnapshot = await topicRef.get();
      const documentNames = querySnapshot.docs.map((doc) => doc.id);
      if (documentNames.length === 0) {
        console.log("No documents found in the Questions collection.");
        return [];
      }
      const randomMainTopics = getRandomArray(documentNames);

      // Get random topics from each main topic
      for (let i = 0; i < randomMainTopics.length; i++) {
        const subTopicDoc = await topicRef.doc(randomMainTopics[i].topic).get();
        const subTopicData = subTopicDoc.data();
        // console.log(randomMainTopics[i].topic)
        // console.log("subTopicData", subTopicData);
        if (subTopicData.topics !== undefined) {
          const randomTopic = getRandomItem(subTopicData.topics);
          randomMainTopics[i].subTopic = randomTopic;
        }
      }

      // Get random questions from each subtopic
      const randomQuestions = [];
      for (let i = 0; i < randomMainTopics.length; i++) {
        if (randomMainTopics[i].subTopic !== null) {
          const questionsRef = firestore()
            .collection("Questions")
            .doc(randomMainTopics[i].topic)
            .collection(randomMainTopics[i].subTopic)
            .where("questionStyle", "==", randomMainTopics[i].type)
            .limit(1);
          const querySnapshot = await questionsRef.get();
          const questionDocs = querySnapshot.docs;
          randomQuestions.push(questionDocs[0].data());
        }
      }

      //   const questionsRef = await firestore()
      //     .collection("Questions")
      //     .doc("cardiovascular")
      //     .collection("atrial fibrillation")
      //     .where("questionStyle", "==", "firstLineTreatment")
      //     .limit(1)
      //     .get();
      //   console.log(questionsRef.docs[0].data());

    //   console.log("randomQuestions", randomQuestions);
    setRandomQues(randomQuestions);
    } catch (error) {
      console.log("Error fetching random questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchRandomQues();
  }, []);

  return { randomQues, loading };
};

export default useGetRandomQues;
