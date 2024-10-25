import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "@/theme";

const GetStarted = () => {
  return (
    <View style={styles.container}>
      <Text>GetStarted</Text>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
});
