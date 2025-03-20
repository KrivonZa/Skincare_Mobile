import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export function FirstLoginBanner({ onSkip, onTakeQuiz }) {
  const navigation = useNavigation();

  return (
    <>
      {/* Darkening Overlay */}
      <View style={styles.overlay} />
      {/* Pop-up Banner */}
      <LinearGradient
        colors={["#ff909a", "#ff909a"]} // Pink gradient matching logo
        style={styles.bannerContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Image
          source={require("../../../assets/Skincare-Logo-Pink.png")} // Adjust path based on your folder structure
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.bannerText}>
          Get Started with Your Personalized Skincare Journey
        </Text>
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => {
            onTakeQuiz();
            navigation.navigate("Quiz");
          }}
        >
          <Text style={styles.buttonText}>Take Quiz Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipText}>No thanks</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darkens content behind
    zIndex: 999, // Below banner but above other content
  },
  bannerContainer: {
    padding: 20,
    marginHorizontal: 20,
    marginTop: 50,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Above overlay
  },
  logo: {
    width: 100, // Adjust based on your logo’s size
    height: 100,
    marginBottom: 15,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  quizButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    color: "#F06B7E",
    fontSize: 16,
    fontWeight: "700",
  },
  skipButton: {
    paddingVertical: 5,
  },
  skipText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.8,
    textDecorationLine: "underline",
  },
});

export default FirstLoginBanner;