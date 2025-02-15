import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import StatusButton from "./statusButton";
import CustomText from "./CustomText";
import LottieView from "lottie-react-native";
import { theme } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";

const LoadingModal = ({
  isQuestionFetching,
  error,
  setIsQuestionFetching,
  errorMsg,
}) => {
  return (
    <Modal
      visible={isQuestionFetching}
      transparent
      animationType="fade"
      // onRequestClose={() => setError(false)}
    >
      <View style={styles.modalContainer}>
        {/* Circle with shadow */}
        {error ? (
          <>
            <View style={styles.iconCircle}>
              <MaterialIcons name="cancel" size={55} color="#EF5555" />
            </View>
            {/* Title */}
            <CustomText style={styles.title}>No Question Fetched!</CustomText>
            {/* Description */}
            <CustomText style={styles.description}>{errorMsg}</CustomText>

            <StatusButton
              text={"Continue"}
              width={"80%"}
              type={"backTopics"}
              setIsQuestionFetching={setIsQuestionFetching}
            />
          </>
        ) : (
          <>
            {/* <View style={styles.iconCircle}>
          <MaterialIcons name="cancel" size={55} color="#EF5555" />
        </View> */}
            {/* Animation */}
            <LottieView
              source={require("@/assets/animations/loading.json")}
              autoPlay
              loop
              style={{ width: 200, height: 200 }}
            />
            {/* Title */}
            <CustomText style={styles.title}>Loading Questions!</CustomText>
            {/* Description */}
            <CustomText style={styles.description}>
              The questions are being loaded, Please wait...
            </CustomText>
          </>
        )}
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 30,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "95%",
    justifyContent: "space-between",
  },

  button: {
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#F0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: "#000", // Black shadow
    shadowOffset: { width: 0, height: 4 }, // Offset of the shadow
    shadowOpacity: 0.1, // Opacity of the shadow
    shadowRadius: 10, // Blur effect of the shadow

    // Elevation for Android
    elevation: 5, // Adds shadow on Android
  },

  lowerBox: {
    width: "95%",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: "#000", // Black shadow
    shadowOffset: { width: 0, height: 4 }, // Offset of the shadow
    shadowOpacity: 0.01, // Opacity of the shadow
    shadowRadius: 10, // Blur effect of the shadow

    flexDirection: "row",
    justifyContent: "space-between",
    // Elevation for Android
    elevation: 5, // Adds shadow on Android
  },
  buttonText: {
    color: theme.colorBlack,
    // fontWeight: "bold",
    fontSize: 16,
    width: "80%",
    fontFamily: "Poppins-Semi",
    textTransform: "capitalize",
  },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darker background overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10, // For Android shadow
  },

  icon: {
    width: 60,
    height: 60,
  },
  title: {
    // fontWeight: "bold",
    fontFamily: "Poppins-Semi",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
    marginTop: 10,
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  noTopicsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noTopicsText: {
    fontSize: 16,
    fontFamily: "Poppins-Semi",
    textAlign: "center",
    color: theme.textColor,
  },
});
