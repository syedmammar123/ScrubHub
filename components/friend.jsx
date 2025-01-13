import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";

export default function Friend({
  position,
  photoUrl,
  Name,
  marks,
  acceptBtn = false,
  onAccept,
  onReject,
  onRemove,
  id,
}) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageName}>
          {position && <Text style={styles.bluefont}>{position}</Text>}
          <Image style={styles.image} source={photoUrl} />
          <Text style={styles.friendName}>{Name}</Text>
        </View>
        {marks ? (
          <Text style={styles.bluefont}>{marks}</Text>
        ) : (
          <View style={styles.btns}>
            {acceptBtn ? (
              <>
                <Pressable style={styles.greenBtn} onPress={() => onAccept(id)}>
                  <Text style={styles.btnText}>Accept</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={() => onReject(id)}>
                  <Entypo name="cross" size={24} color="white" />
                </Pressable>
              </>
            ) : (
              <Pressable style={styles.btn} onPress={() => onRemove(id)}>
                <Text style={styles.btnText}>Remove</Text>
              </Pressable>
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
