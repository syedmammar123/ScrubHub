import { View, Text, Image, Pressable, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { avatars } from "@/app/userInfoScreen";
import useChallengeFriend from "@/hooks/useChallengeFriend";
import useQuesStore from "@/store/quesStore";

const ChallengeFriendItem = ({ friend,friends }) => {
  const { challengeFriend, loading } = useChallengeFriend();
  const { questions,getScore } = useQuesStore((state) => state);

  const handleChallengeFriend = (friendId) => {
    let score = getScore();
    const isChanllengeFriendSuccessfull = challengeFriend(
      friendId,
      score,
      questions
    );
    if (isChanllengeFriendSuccessfull) {
      friends.map((friend) => {
        if (friend.id === friendId) {
          friend.challenged = true;
        }
      });
    }
  };
  return (
    <View
      key={friend.id}
      className="flex-row items-center px-5 py-3 border-b border-gray-300 justify-between"
    >
      <View className="flex-row items-center gap-5">
        <Image
          source={avatars[friend.avatarId]}
          className="rounded w-14 h-14"
        />
        <Text className="text-lg">{friend.username}</Text>
      </View>
      {friend.challenged ? (
        <Pressable className="bg-[#FF0000] py-2 px-3 rounded min-w-30">
          <Text className="text-white">Challenged</Text>
        </Pressable>
      ) : (
        <TouchableOpacity
          className="bg-[#93D334] py-2 px-4 rounded min-w-30 items-center"
          disabled={loading}
          onPress={() => {
            handleChallengeFriend(friend.id);
          }}
        >{
            loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
            ) : ( <Text className="text-white">Challenge</Text> )
        }
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChallengeFriendItem;
