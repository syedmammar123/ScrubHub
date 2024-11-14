import { View, StyleSheet, PanResponder, Animated, Text } from "react-native";
import React from "react";
import { theme } from "@/theme";
import { useRef, useState } from "react";

export default function InputBox({ letter }) {
  // Create a ref to store the position of the card
  const position = useRef(new Animated.ValueXY()).current;

  // State to track if the card is being dragged
  const [dragging, setDragging] = useState(false);

  // Create a pan responder to handle touch events
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // When touch gesture starts,
        //set dragging to true
        setDragging(true);
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: position.x,
            dy: position.y,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        // When touch gesture is released,
        //set dragging to false
        setDragging(false);
      },
    })
  ).current;
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: position.getTranslateTransform(),
            opacity: dragging ? 0.8 : 1,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={{ fontWeight: "bold" }}>{letter}</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.outerBorder,
          {
            transform: position.getTranslateTransform(),
            opacity: dragging ? 0.8 : 1,
          },
        ]}
        {...panResponder.panHandlers}
      ></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 20, // Space for the outer border
  },
  box: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: theme.barColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "white",
    zIndex: 10,
  },
  outerBorder: {
    position: "absolute",
    bottom: -4, // Adjust the gap between the inner and outer borders
    width: 40,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    zIndex: -1,
    borderColor: theme.barColor,
  },
});
