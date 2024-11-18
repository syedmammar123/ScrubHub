import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";

export default function Friend({ photoUrl, Name }) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageName}>
          <Image style={styles.image} source={{ uri: photoUrl }} />
          <Text style={styles.friendName}>{Name}</Text>
        </View>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Remove</Text>
        </Pressable>
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
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  friendName: { marginLeft: 10, textTransform: "capitalize", fontSize: 16 },
  btn: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  btnText: {
    color: "white",
    textTransform: "uppercase",
  },
  divider: {
    width: "100%",
    backgroundColor: "lightgray",
    height: 2,
  },
});
