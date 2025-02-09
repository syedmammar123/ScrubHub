import React, { useState } from "react";
import {
  View,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useCurrentUserStore from "@/store/currentUserStore";
import { avatars } from "@/app/userInfoScreen";
import { theme } from "@/theme";
import useUpdateAvatar from "@/hooks/useUpdateAvatar";
import CustomText from "./CustomText";

const ProfilePic = () => {
  const { user } = useCurrentUserStore((state) => state);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { loading, updateAvatar } = useUpdateAvatar(setModalVisible);

  const handleEditPress = () => {
    setModalVisible(true);
  };

  const handleModalBtn = () => {
    if (selectedAvatar) {
      updateAvatar(parseInt(selectedAvatar));
    } else {
      setModalVisible(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAvatar(null);
  };

  const handleSetAvatar = (id) => {
    if (id == selectedAvatar) {
      setSelectedAvatar(null);
    } else {
      setSelectedAvatar(id);
    }
  };

  const newAvatars = Object.keys(avatars).filter(
    (id) => Number(id) !== user.avatarId,
  );

  return (
    <View style={styles.container}>
      {/* Profile Picture Container */}
      <View style={styles.profileContainer}>
        <Image source={avatars[user.avatarId]} style={styles.profilePicture} />
        {/* Pencil Icon */}
        <TouchableOpacity style={styles.pencilIcon} onPress={handleEditPress}>
          <Ionicons name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
        style={styles.modal}
      >
        <Pressable onPress={closeModal} style={[styles.modalOverlay]}>
          <View style={styles.modalContent}>
            <CustomText style={styles.modalText}>Edit Profile Picture</CustomText>
            <View style={styles.newProfileContainer}>
              {newAvatars.map((id) => (
                <TouchableOpacity
                  style={styles.newProfile}
                  key={id}
                  onPress={() => {
                    handleSetAvatar(id);
                  }}
                >
                  <Image
                    source={avatars[id]}
                    style={[
                      styles.profilePicture,
                      selectedAvatar == id ? styles.highlightedPicture : null,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={handleModalBtn}
              style={styles.closeButton}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <CustomText style={styles.closeButtonText}>
                  {selectedAvatar ? "Update" : "Close"}
                </CustomText>
              )}
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 120,
  },
  profileContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  pencilIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: theme.colorGreen,
    borderRadius: 12,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    margin: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: theme.colorGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  newProfileContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    marginBottom: 20,
  },
  newProfile: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  highlightedPicture: {
    borderColor: theme.colorGreen,
    borderWidth: 3,
  },
});

export default ProfilePic;
