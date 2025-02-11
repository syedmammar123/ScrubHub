import { useState } from "react";
import { getRandomArray, getRandomItem } from "../util/getRandomItem";
import firestore from "@react-native-firebase/firestore";

const useGetRandomQues = () => {
  const [randomQues, setRandomQues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomQues = async (questionLength) => {
    setLoading(true);
    setError(null);
    try {
      // Get all document IDs from the Questions collection
      const topicRef = firestore().collection("Topics");
      // const querySnapshot = await topicRef.get();
      // const documentNames = querySnapshot.docs.map((doc) => doc.id);
      // if (documentNames.length === 0) {
      //   console.log("No documents found in the Questions collection.");
      //   return [];
      // }
      // const randomMainTopics = getRandomArray(documentNames);
      const randomMainTopics = getRandomArray(
        ["cardiovascular", "gastrointestinal"],
        questionLength
      );

      // Get random subTopics from each main topic
      const subTopicPromises = randomMainTopics.map(async (topicObj) => {
        const subTopicDoc = await topicRef.doc(topicObj.topic).get();
        const subTopicData = subTopicDoc.data();
        return {
          ...topicObj, // Spread existing properties (topic, type)
          subTopic: subTopicData?.topics
            ? getRandomItem(subTopicData.topics)
            : null,
        };
      });

      const selectedTopics = await Promise.all(subTopicPromises);
  

      // Get random questions from each subtopic
      const questionPromises = selectedTopics.map(
        async ({ topic, subTopic, type }) => {
          if (!subTopic) return null;

          const questionsRef = firestore()
            .collection("Questions")
            .doc(topic)
            .collection(subTopic)
            .where("questionStyle", "==", type)
            .limit(1);

          const querySnapshot = await questionsRef.get();
          return querySnapshot.docs.length > 0
            ? querySnapshot.docs[0].data()
            : null;
        }
      );

      const randomQuestions = (await Promise.all(questionPromises)).filter(
        Boolean
      );
      setRandomQues(randomQuestions);
    } catch (error) {
      console.log("Error fetching random questions:", error);
      setError(error || "Error fetching random questions");
    } finally {
      setLoading(false);
    }
  };

  return { fetchRandomQues, randomQues, loading, error };
};

export default useGetRandomQues;
