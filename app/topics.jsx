import React, { useEffect, useState, useRef, useCallback } from "react";
import { AppState } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/theme";
import BackButton from "@/components/backButton";
import BackgroundImage from "@/components/backgroundImage";
import useQuesStore from "@/store/quesStore";
import { getQuestionType } from "@/util/utilQuesFunc";
import { useFocusEffect, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useGlobalSearchParams } from "expo-router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "@react-native-firebase/firestore";
import { db } from "@/config/firebase";
import { getAuth } from "@react-native-firebase/auth";
import ScrubLogo from "@/components/scrubLogo";
import CustomText from "@/components/CustomText";
import LoadingModal from "@/components/LoadingModal";

const buttons = [
  { label: "Topic 1" },
  { label: "Test Topic 1" },
  { label: "Test Topic 2" },
  { label: "Gastrointestinal" },
  { label: "Musculoskeletal & Dermatology" },
  { label: "Renal" },
  { label: "Nervous" },
  { label: "Reproductive & Pregnancy" },
  { label: "Cardiovascular 1" },
  { label: "Cardiovascular 2" },
  { label: "Cardiovascular 3" },
  { label: "Cardiovascular 4" },
  { label: "Cardiovascular 5" },
  { label: "Cardiovascular 6" },
  { label: "Cardiovascular 7" },
  { label: "Cardiovascular 8" },
];

export default function Topics() {
  const {
    fetchQuestions,
    getCurrentQuestion,
    fetchReviewQuestions,
    currentIndex,
    getCurrentType,
    getfetchedQuestionTopic,
    getfetchedReviewTopic,
    getReviewQuestion,
    currentIndexReview,
  } = useQuesStore((state) => state);
  const [topics, setTopics] = useState([]);
  const { system } = useGlobalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isQuestionFetching, setIsQuestionFetching] = useState(false);
  const [error, setError] = useState(false);
  const [hasTopics, setHasTopics] = useState(false);
  // useEffect(() => {
  //   setIsQuestionFetching(false);
  //   const subscription = AppState.addEventListener("change", (nextAppState) => {
  //     if (nextAppState === "active") {
  //       setIsQuestionFetching(false); // Reset when app returns
  //     }
  //   });

  //   return () => subscription.remove();
  // }, []);
  const handlePress = async (topic) => {
    if (error) {
      setError(false);
    }

    setIsQuestionFetching(true);
    if (getCurrentType() === "review") {
      if (getfetchedReviewTopic() === topic) {
        console.log("Already fetched");

        const nextScreen = getQuestionType(getReviewQuestion());
        console.log("NEXT SCREEN", nextScreen);
        if (nextScreen === "wordscrambled") {
          const answerLength = getReviewQuestion()?.answer?.replace(
            /\s/g,
            ""
          ).length;
          router.navigate({
            pathname: nextScreen,
            params: { answerLength },
          });

          setTimeout(() => setIsQuestionFetching(false), 300);
        } else {
          router.navigate(nextScreen);
          setTimeout(() => setIsQuestionFetching(false), 300);
          // setIsQuestionFetching(false);
        }
      } else {
        const lengthOfQuestions = await fetchReviewQuestions(
          system.toLowerCase(),
          topic
        );
        console.log("LENGTH GIVEN AT", lengthOfQuestions);

        if (lengthOfQuestions > 0) {
          const nextScreen = getQuestionType(getReviewQuestion());
          if (nextScreen === "wordscrambled") {
            const answerLength = getReviewQuestion()?.answer?.replace(
              /\s/g,
              ""
            ).length;
            router.navigate({
              pathname: nextScreen,
              params: { answerLength },
            });

            setTimeout(() => setIsQuestionFetching(false), 300);
            // setIsQuestionFetching(false);
          } else {
            router.navigate(nextScreen);
            // setIsQuestionFetching(false);
          }
        } else {
          console.log("NO QUESTIONS FETCHED");
          setError(true);
          // setIsQuestionFetching(false);
        }
      }
    } else {
      console.log("FETCHED TOPICS", getfetchedQuestionTopic());
      console.log("TOPIC", topic);

      if (getfetchedQuestionTopic() === topic) {
        console.log("HIT");
        console.log(getCurrentQuestion()?.questionStyle);
        console.log("CALL", getQuestionType(getCurrentQuestion()));

        const nextScreen = getQuestionType(getCurrentQuestion());
        if (nextScreen === "wordscrambled") {
          const answerLength = getCurrentQuestion()?.answer?.replace(
            /\s/g,
            ""
          ).length;

          router.navigate({
            pathname: nextScreen,
            params: { answerLength },
          });
          // setIsQuestionFetching(false);
          setTimeout(() => setIsQuestionFetching(false), 300);
        } else {
          router.navigate(nextScreen);
          setTimeout(() => setIsQuestionFetching(false), 300);
          // setIsQuestionFetching(false);
        }
      } else {
        const questions = await fetchQuestions(system.toLowerCase(), topic);
        if (questions === 0) {
          // setIsQuestionFetching(false);
          setError(true);
          return;
        }
        const nextScreen = getQuestionType(getCurrentQuestion());
        if (nextScreen === "wordscrambled") {
          // setIsQuestionFetching(false);
          const answerLength = getCurrentQuestion()?.answer?.replace(
            /\s/g,
            ""
          ).length;

          router.navigate({
            pathname: nextScreen,
            params: { answerLength },
          });
          setTimeout(() => setIsQuestionFetching(false), 300);
        } else {
          // setIsQuestionFetching(false);
          router.navigate(nextScreen);
          setTimeout(() => setIsQuestionFetching(false), 300);
        }
      }
    }
  };

  const getTopics = async () => {
    console.log("TOPICS====>");
    console.log(system);
    setLoading(true);
    const topicsCollectionRef = doc(
      db,
      "Topics",
      system.toLowerCase().replace(/\s+/g, "")
    );
    try {
      const topics = await getDoc(topicsCollectionRef);
      setTopics(topics.data().topics);
      if (topics.data().topics) {
        setHasTopics(true);
      }
    } catch (error) {
      setHasTopics(false);
      setError(error.message);
      // console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInfo = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.log("No user is logged in.");
        return;
      }

      const userId = user.uid;
      console.log("Currently logged in user ID:", userId);

      const db = getFirestore();

      // Reference to the 'Topics' collection
      const topicsCollectionRef = collection(db, "Topics");

      // Get all documents in the 'Topics' collection
      const querySnapshot = await getDocs(topicsCollectionRef);

      if (querySnapshot.empty) {
        console.log("No documents found in Topics.");
        return null;
      }

      // Loop through each document and log its data
      querySnapshot.forEach((doc) => {
        console.log(`Document ID: ${doc.id}, Data:`, doc.data());
      });
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const getRandom = async () => {
    if (error) {
      setError(false);
    }

    setIsQuestionFetching(true);

    if (getfetchedQuestionTopic() === `${system.toLowerCase()}all`) {
      console.log("HIT");
      console.log(getCurrentQuestion().questionStyle);
      console.log("CALL", getQuestionType(getCurrentQuestion()));

      const nextScreen = getQuestionType(getCurrentQuestion());
      if (nextScreen === "wordscrambled") {
        const answerLength = getCurrentQuestion()?.answer?.replace(
          /\s/g,
          ""
        ).length;

        router.navigate({
          pathname: nextScreen,
          params: { answerLength },
        });

        setTimeout(() => setIsQuestionFetching(false), 300);
        // setIsQuestionFetching(false);
      } else {
        router.navigate(nextScreen);
        // setIsQuestionFetching(false);
      }
      console.log(nextScreen);

      setTimeout(() => setIsQuestionFetching(false), 300);
      // setIsQuestionFetching(false);
    } else {
      const length = await fetchQuestions(system.toLowerCase(), topics);
      if (length === 0) {
        setError(true);
        return;
      }
      const nextScreen = getQuestionType(getCurrentQuestion());
      // setIsQuestionFetching(false);
      if (nextScreen === "wordscrambled") {
        const answerLength = getCurrentQuestion()?.answer?.replace(
          /\s/g,
          ""
        ).length;

        router.navigate({
          pathname: nextScreen,
          params: { answerLength },
        });

        setTimeout(() => setIsQuestionFetching(false), 300);
        // setIsQuestionFetching(false);
      } else {
        router.navigate(nextScreen);

        setTimeout(() => setIsQuestionFetching(false), 300);
        // setIsQuestionFetching(false);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (isQuestionFetching) {
        setIsQuestionFetching(false);
      }
      getTopics(); // Fetch topics when screen comes into focus
    }, [])
  );
  // console.log("TOPICS,=>", topics);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <BackButton />

      {/* Curvy Lines Background */}
      <BackgroundImage>
        {/* Content Container */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Logo */}

          {loading ? (
            <>
              <ScrubLogo type={null} />
              <View style={{ flex: 1 }}>
                <View
                  style={{
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
              </View>
            </>
          ) : !hasTopics ? (
            <View style={styles.noTopicsContainer}>
              <CustomText style={styles.noTopicsText}>
                Oops! This system is still in med school. Check back soon!
              </CustomText>
            </View>
          ) : (
            <>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "90%",
                  marginBottom: 20,
                }}
              >
                <View>
                  <CustomText
                    style={{ fontFamily: "Poppins-Semi", fontSize: 15 }}
                  >
                    {topics && "Choose From Topics..."}
                  </CustomText>
                </View>
                <View>
                  {topics && getCurrentType() === "study" && (
                    <Pressable
                      onPress={getRandom}
                      // disabled={isQuestionFetching}
                      style={{
                        backgroundColor: theme.barColor,
                        paddingHorizontal: 40,
                        paddingVertical: 10,
                        borderWidth: 1,
                        borderColor: theme.barBgColor,
                        borderRadius: 10,
                        // Shadow for iOS
                        shadowColor: "#000", // Black shadow
                        shadowOffset: { width: 0, height: 4 }, // Offset of the shadow
                        shadowOpacity: 0.1, // Opacity of the shadow
                        shadowRadius: 10, // Blur effect of the shadow

                        // Elevation for Android
                        elevation: 20, // Adds shadow on Android
                      }}
                    >
                      <CustomText
                        style={{
                          // fontWeight: "bold",
                          fontSize: 14,
                          color: "white",
                          fontFamily: "Poppins-Semi",
                        }}
                      >
                        Random
                      </CustomText>
                    </Pressable>
                  )}
                </View>
              </View>
              <View style={styles.buttonContainer}>
                {/* Buttons */}
                {topics?.map((button, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      console.log(`Button Pressed: ${button}`); // Debugging
                      handlePress(button);
                    }}
                    key={`${button}-${index}`}
                    style={[styles.button]}
                  >
                    <CustomText style={styles.buttonText}>{button}</CustomText>

                    <AntDesign
                      name="rightcircle"
                      size={24}
                      color={theme.barColor}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
          {/* Error Modal */}
          <LoadingModal
            setIsQuestionFetching={setIsQuestionFetching}
            isQuestionFetching={isQuestionFetching}
            error={error}
            errorMsg={
              "Error fetching questions. No questions available at the moment."
            }
          />
        </ScrollView>
      </BackgroundImage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 30,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "95%",
    justifyContent: "space-between",
  },

  button: {
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#F0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    zIndex: 999,
    shadowColor: "#000", // Black shadow
    shadowOffset: { width: 0, height: 4 }, // Offset of the shadow
    shadowOpacity: 0.1, // Opacity of the shadow
    shadowRadius: 10, // Blur effect of the shadow

    // Elevation for Android
    elevation: 5, // Adds shadow on Android
  },

  lowerBox: {
    width: "95%",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: "#000", // Black shadow
    shadowOffset: { width: 0, height: 4 }, // Offset of the shadow
    shadowOpacity: 0.01, // Opacity of the shadow
    shadowRadius: 10, // Blur effect of the shadow

    flexDirection: "row",
    justifyContent: "space-between",
    // Elevation for Android
    elevation: 5, // Adds shadow on Android
  },
  buttonText: {
    color: theme.colorBlack,
    // fontWeight: "bold",
    fontSize: 16,
    width: "80%",
    fontFamily: "Poppins-Semi",
    textTransform: "capitalize",
  },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darker background overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10, // For Android shadow
  },

  icon: {
    width: 60,
    height: 60,
  },
  title: {
    // fontWeight: "bold",
    fontFamily: "Poppins-Semi",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
    marginTop: 10,
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  noTopicsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noTopicsText: {
    fontSize: 16,
    fontFamily: "Poppins-Semi",
    textAlign: "center",
    color: theme.textColor,
  },
});
