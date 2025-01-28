import React, { useEffect, useState } from "react";
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
import { useRouter } from "expo-router";
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
  const [error, setError] = useState(false);
  const handlePress = async (topic) => {
    console.log(system);
    if (getCurrentType() === "review") {
      if (currentIndexReview < 8) {
        if (getfetchedReviewTopic() === topic) {
          console.log("Already fetched");

          const nextScreen = getQuestionType(getReviewQuestion());
          console.log("NEXT SCREEN", nextScreen);

          router.navigate(nextScreen);
        } else {
          const lengthOfQuestions = await fetchReviewQuestions(
            system.toLowerCase(),
            topic
          );
          console.log("LENGTH GIVEN AT", lengthOfQuestions);

          if (lengthOfQuestions > 0) {
            const nextScreen = getQuestionType(getReviewQuestion());

            router.navigate(nextScreen);
          } else {
            console.log("NO QUESTIONS FETCHED");
            setError(true);
          }
        }
      } else {
        router.navigate("/");
      }
    } else {
      if (currentIndex < 8) {
        if (getfetchedQuestionTopic() === topic) {
          console.log("HIT");
          console.log(getCurrentQuestion().questionStyle);
          console.log("CALL", getQuestionType(getCurrentQuestion()));

          const nextScreen = getQuestionType(getCurrentQuestion());
          console.log(nextScreen);

          router.navigate(nextScreen);
        } else {
          await fetchQuestions(system.toLowerCase(), topic);
          const nextScreen = getQuestionType(getCurrentQuestion());

          router.navigate(nextScreen);
        }
      } else {
        // 9 Questions solved already
        router.navigate("/");
      }
    }
  };

  const getTopics = async () => {
    console.log("TOPICS====>");
    console.log(system);
    setLoading(true);
    const topicsCollectionRef = doc(db, "Topics", system.toLowerCase());
    try {
      const topics = await getDoc(topicsCollectionRef);

      setTopics(topics.data().topics);
    } catch (error) {
      console.error("Error fetching document:", error);
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
    if (currentIndex < 8) {
      if (getfetchedQuestionTopic() === `${system.toLowerCase()}all`) {
        console.log("HIT");
        console.log(getCurrentQuestion().questionStyle);
        console.log("CALL", getQuestionType(getCurrentQuestion()));

        const nextScreen = getQuestionType(getCurrentQuestion());
        console.log(nextScreen);

        router.navigate(nextScreen);
      } else {
        await fetchQuestions(system.toLowerCase(), topics);
        const nextScreen = getQuestionType(getCurrentQuestion());

        router.navigate(nextScreen);
      }
    } else {
      // 9 Questions solved already
      router.navigate("/");
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <BackButton />

      {/* Curvy Lines Background */}
      <BackgroundImage>
        {/* Content Container */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Logo */}

          {loading ? (
            <>
              <ScrubLogo />
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
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {topics && "Choose From Topics..."}
                  </Text>
                </View>
                <View>
                  {topics && (
                    <Pressable
                      onPress={getRandom}
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
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 14,
                          color: "white",
                        }}
                      >
                        Random
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
              <View style={styles.buttonContainer}>
                {/* Buttons */}
                {topics?.map((button, index) => (
                  <TouchableOpacity
                    onPress={() => handlePress(button)}
                    key={index}
                    style={[styles.button]}
                  >
                    <Text style={styles.buttonText}>{button}</Text>
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
          <Modal
            visible={error}
            transparent
            animationType="fade"
            onRequestClose={() => setError(false)}
          >
            <TouchableOpacity
              style={styles.overlay}
              onPress={() => setError(false)}
              activeOpacity={1}
            >
              <View style={styles.modalContainer}>
                {/* Circle with shadow */}
                <View style={styles.iconCircle}>
                  <MaterialIcons name="cancel" size={55} color="#EF5555" />
                </View>

                {/* Title */}
                <Text style={styles.title}>No Question Fetched!</Text>

                {/* Description */}
                <Text style={styles.description}>
                  Error fetching questions. No questions available at the
                  moment.
                </Text>
              </View>
            </TouchableOpacity>
          </Modal>

          {/* <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>Topics Coming Soon...</Text>
          </View> */}
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
    fontWeight: "bold",
    fontSize: 16,
    width: "80%",
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
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
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
    fontWeight: "bold",
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
});
