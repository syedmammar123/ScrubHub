import { View, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/theme";
import useQuesStore from "@/store/quesStore";

export default function UpperBar() {
  const { getCurrentType, currentIndex, currentIndexReview } = useQuesStore(
    (state) => state
  );
  return (
    <View style={styles.bar}>
      <View
        style={[
          styles.innerBar,
          {
            width: `${((getCurrentType() === "review" ? currentIndexReview : currentIndex) + 1) * 11.11}%`,
          },
        ]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: "95%",
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.barBgColor,
    alignSelf: "center",
  },
  innerBar: {
    position: "relative",
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.barColor,
    alignSelf: "flex-start",
  },
});
