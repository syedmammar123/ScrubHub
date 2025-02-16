import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AppState } from "react-native";
import React, { useCallback, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { avatars } from "@/app/userInfoScreen";
import CustomText from "./CustomText";
import { getRandomArray } from "@/util/getRandomItem";
import useGetRandomQues from "@/hooks/useGetRandomQues";
import { theme } from "@/theme";
import useQuesStore from "@/store/quesStore";
import { getQuestionType } from "@/util/utilQuesFunc";
import { useEffect } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import LoadingModal from "./LoadingModal";

export default function Friend({
  position,
  photoUrl,
  Name,
  marks,
  acceptBtn = false,
  onAccept,
  onReject,
  onRemove,
  onChallenge,
  id,
}) {
  const router = useRouter("");
  const { fetchRandomQues } = useGetRandomQues();
  const [isQuestionFetching, setIsQuestionFetching] = useState(false);
  const [error, setError] = useState(false);
  const [friendId, setFriendId] = useState(false);
  const {
    getChallengingFriendsQuestion,
    fetchChallengingFriendsQuestions,
    getOpponentID,
    clearFields2,
    setType,
  } = useQuesStore((state) => state);

  const handleChallangeFriend = async (friendId) => {
    setFriendId(friendId);
    if (error) {
      setError(false);
    }
    setIsQuestionFetching(true);
    // This Checks if User you are challenging is same as before
    const currentChallenge = getOpponentID();
    if (currentChallenge === "" || currentChallenge !== friendId) {
      // if it is not equal so we fetch again
      console.log("FETCHING");
      const questions = await fetchRandomQues(15);
      console.log("questions lENGTS", questions);

      if (questions === 0) {
        setError(true);
        return;
      }
      console.log("RANDOM QUESRIONS", questions);
      console.log(friendId);
      clearFields2();
      setType("ChallengingFriends");

      let questionsLength = fetchChallengingFriendsQuestions(
        questions,
        friendId
      );

      console.log("FETCH COMPLERE");

      const nextScreen = getQuestionType(getChallengingFriendsQuestion());
      console.log("NEXT SCREEN", nextScreen);
      if (nextScreen === "wordscrambled") {
        const answerLength = getChallengingFriendsQuestion()?.answer?.replace(
          /\s/g,
          ""
        ).length;

        router.navigate({
          pathname: nextScreen,
          params: { answerLength },
        });
        // setIsQuestionFetching(false);
      } else {
        // setIsQuestionFetching(false);
        router.navigate(nextScreen);
      }
    } else {
      // Already Fetched Questions
      const nextScreen = getQuestionType(getChallengingFriendsQuestion());
      if (nextScreen === "wordscrambled") {
        // setIsQuestionFetching(false);
        const answerLength = getChallengingFriendsQuestion()?.answer?.replace(
          /\s/g,
          ""
        ).length;

        router.navigate({
          pathname: nextScreen,
          params: { answerLength },
        });
      } else {
        // setIsQuestionFetching(false);
        router.navigate(nextScreen);
      }
    }
  };
  // useEffect(() => {
  //   // setIsQuestionFetching(false);
  //   const subscription = AppState.addEventListener("change", (nextAppState) => {
  //     if (nextAppState === "active") {
  //       setIsQuestionFetching(false); // Reset when app returns
  //     }
  //   });

  //   return () => subscription.remove();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      setIsQuestionFetching(false);
    }, [])
  );
  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageName}>
          {position && (
            <CustomText style={styles.bluefont}>{position}</CustomText>
          )}
          <Image style={styles.image} source={avatars[photoUrl]} />
          <CustomText style={styles.friendName}>{Name}</CustomText>
        </View>
        {marks ? (
          <CustomText style={styles.bluefont}>
            {marks === "null" ? 0 : marks}
          </CustomText>
        ) : (
          <View style={styles.btns}>
            {acceptBtn ? (
              <>
                <Pressable style={styles.greenBtn} onPress={() => onAccept(id)}>
                  <CustomText style={styles.btnText}>Accept</CustomText>
                </Pressable>
                <Pressable style={styles.btn} onPress={() => onReject(id)}>
                  <Entypo name="cross" size={24} color="white" />
                </Pressable>
              </>
            ) : (
              <>
                <Pressable
                  className="rounded-full bg-green-500 px-2 py-1 text-white"
                  onPress={() => handleChallangeFriend(id)}
                  // onPress={() => onChallenge(id)}
                  // disabled={loading}
                >
                  {/* {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : ( */}
                  <CustomText style={styles.btnText}>Challenge</CustomText>
                  {/* )} */}
                </Pressable>
                <Pressable
                  className=" rounded-full bg-red-500 px-2 py-1 text-white"
                  onPress={() => onRemove(id)}
                >
                  <CustomText style={styles.btnText}>Remove</CustomText>
                </Pressable>
              </>
            )}
          </View>
        )}
      </View>
      <View style={styles.divider}></View>
      {friendId === id && (
        <LoadingModal
          isQuestionFetching={isQuestionFetching}
          setIsQuestionFetching={setIsQuestionFetching}
          error={error}
          errorMsg={
            "Error fetching questions. No questions available at the moment."
          }
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop: 15,
  },
  imageName: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bluefont: {
    fontSize: 16,
    color: "#4374BA",
    fontWeight: "bold",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  friendName: { marginLeft: 10, textTransform: "capitalize", fontSize: 16 },
  btn: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  greenBtn: {
    backgroundColor: "#00FF00",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  btns: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    textTransform: "uppercase",
  },
  divider: {
    width: "100%",
    backgroundColor: "lightgray",
    height: 1.5,
  },
});
