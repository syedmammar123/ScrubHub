import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Redirect, router } from "expo-router";
import { doc, getDoc, getFirestore, setDoc } from "@react-native-firebase/firestore";
import useCurrentUserStore from "@/store/currentUserStore";


export const avatars = {
  1: require("@/assets/avatar1.png"),
  2: require("@/assets/avatar2.png"),
  3: require("@/assets/avatar3.png"),
  4: require("@/assets/avatar4.png"),
  5: require("@/assets/avatar5.png"),
  6: require("@/assets/avatar6.png"),
  7: require("@/assets/avatar7.png"),
};

const userInfoScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [uid, setUid] = useState("");
  const [username, setUsername] = useState(""); // State for username
  const [selectedAvatar, setSelectedAvatar] = useState(null); // State for avatar selection
  const route = useRoute();
  const setUser = useCurrentUserStore((state) => state.setUser);
  const user = useCurrentUserStore((state) => state.user);
  // Map avatar IDs to their respective image imports

  useEffect(() => {
    const { phoneNumber, uid } = route.params;
    if (route.params?.phoneNumber) {
      setPhoneNumber(route.params.phoneNumber);
      setUid(route.params.uid);
    }
  }, [route.params?.phoneNumber]);

  const handleAvatarSelect = (id) => {
    setSelectedAvatar(id);
  };

  const handleSave = async () => {
    if (!username || selectedAvatar === null) {
      alert("Please select an avatar and enter a username!");
      return;
    }

    // Create the user data object
    const userData = {
      phoneNumber,
      avatarId: selectedAvatar,
      username,
      uid,
      totalScore: null,
      lastDailyChallengeID: null,
    };

    try {
      // Save the data to Firestore under the collection 'Users' with document ID as uid
      const db = getFirestore();
      const userDocRef = doc(db, "Users", uid);
      await setDoc(userDocRef, userData);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists) {
        console.log(userDoc.data());
        
        await setUser(userDoc.data(), uid);
      }

      console.log("User information saved successfully!");
      await setUser(userDoc.data(), uid);
      router.navigate("/"); // Navigate on successful save
    } catch (error) {
      console.error("Error saving user information:", error);
      alert("An error occurred while saving user information.");
    }
  };

  if (user) {
    console.log("User logged in");
    return <Redirect href="/" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Information</Text>
      <Text style={styles.subtitle}>Select Your Avatar</Text>
      <View style={styles.avatarContainer}>
        {Object.keys(avatars).map((id) => (
          <TouchableOpacity
            key={id}
            onPress={() => handleAvatarSelect(Number(id))}
            style={[
              styles.avatarCircle,
              selectedAvatar === Number(id) && styles.selectedAvatar,
            ]}
          >
            <Image source={avatars[id]} style={styles.avatarImage} />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.subtitle}>Enter Your Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default userInfoScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 10,
    color: "#555",
  },
  avatarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedAvatar: {
    borderColor: "#007BFF",
    borderWidth: 3,
  },
  avatarImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
