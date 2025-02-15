import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { avatars } from "@/app/userInfoScreen";
import CustomText from "./CustomText";
import { getRandomArray } from "@/util/getRandomItem";
import useGetRandomQues from "@/hooks/useGetRandomQues";
import { theme } from "@/theme";
import useQuesStore from "@/store/quesStore";
import { getQuestionType } from "@/util/utilQuesFunc";
import { useEffect } from "react";
import { useRouter } from "expo-router";

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
  const { randomQues, loading, error, fetchRandomQues } = useGetRandomQues();
  const {
    getChallengingFriendsQuestion,
    fetchChallengingFriendsQuestions,
    getOpponentID,
    clearFields2,
    setType,
  } = useQuesStore((state) => state);
  
  const handleChallangeFriend = async (friendId) => {
    // This Checks if User you are challenging is same as before
    const currentChallenge = getOpponentID();
    if (currentChallenge === "" || currentChallenge !== friendId) {
      // if it is not equal so we fetch again
      console.log("FETCHING");
      const questions = await fetchRandomQues(15);
      if (!loading) {
        console.log("RANDOM QUESRIONS", randomQues);
        console.log(friendId);
        clearFields2();
        setType("ChallengingFriends");
        let questionsLength = fetchChallengingFriendsQuestions(
          questions,
          friendId
        );
        if (questionsLength === 0) {
          setErr(true);
          // console.log("YES");
        } else {
          console.log("FETCH COMPLERE");

          const nextScreen = getQuestionType(getChallengingFriendsQuestion());
          console.log("NEXT SCREEN", nextScreen);
          if (nextScreen === "wordscrambled") {
            router.replace("wordscrambledchallengingfriend");
          } else {
            router.replace(nextScreen);
          }
        }
      }
    } else {
      // Already Fetched Questions
      const nextScreen = getQuestionType(getChallengingFriendsQuestion());
      if (nextScreen === "wordscrambled") {
        router.replace("wordscrambledchallengingfriend");
      } else {
        router.replace(nextScreen);
      }
    }
  };

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
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <CustomText style={styles.btnText}>Challenge</CustomText>
                  )}
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
