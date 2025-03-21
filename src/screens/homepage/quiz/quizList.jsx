import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import api from "../../../hooks/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";

export function QuizStatus() {
  const navigation = useNavigation();
  const [quizzes, setQuizzes] = useState([]);
  const [scoreBands, setScoreBands] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const { user } = useAuth();

  // Fetch data logic remains unchanged
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        console.log("Access Token:", token);

        console.log("Fetching /question...");
        try {
          const quizResponse = await api.get("/question", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const formattedQuizzes = quizResponse.data.map((quiz) => ({
            id: quiz._id,
            title: quiz.title || "Untitled Quiz",
            answers: quiz.answers || [],
          }));
          setQuizzes(formattedQuizzes);
        } catch (err) {
          console.error("Error fetching /question:", err.response?.data);
        }

        console.log("Fetching /scoreband...");
        try {
          const scoreBandResponse = await api.get("/scoreband", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setScoreBands(scoreBandResponse.data);
        } catch (err) {
          console.error("Error fetching /scoreband:", err.response?.data);
        }

        console.log("Fetching /roadmap...");
        try {
          const roadmapResponse = await api.get("/roadmap", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setRoadmaps(roadmapResponse.data);
        } catch (err) {
          console.error("Error fetching /roadmap:", err.response?.data);
        }

        console.log("Fetching /service...");
        try {
          const serviceResponse = await api.get("/service", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const uniqueServices = Array.from(
            new Map(
              serviceResponse.data.map((service) => [
                service._id.$oid || service._id,
                service,
              ])
            ).values()
          );
          setServices(uniqueServices);
        } catch (err) {
          console.error("Error fetching /service:", err.response?.data);
          setServices([]);
        }

        setSelectedAnswers({});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAnswerSelect = (quizId, answer) => {
    const updatedAnswers = {
      ...selectedAnswers,
      [quizId]: { title: answer.title, point: answer.point },
    };
    setSelectedAnswers(updatedAnswers);
  };

  const postUserQuiz = async (totalScore, matchedBand) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const result = quizzes.map((quiz) => {
        const answer = selectedAnswers[quiz.id] || { title: "", point: 0 };
        return {
          title: quiz.title,
          answer: answer.title || "",
          point: answer.point || 0,
        };
      });

      const payload = {
        accountId: user._id,
        scoreBandId: matchedBand._id.$oid || matchedBand._id,
        result: result,
        totalPoint: totalScore,
      };

      const response = await api.post("/userQuiz", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      console.error("Error posting to /userQuiz:", err.response?.data);
      throw err;
    }
  };

  const checkScoreBand = async (answers) => {
    const totalScore = Object.values(answers).reduce(
      (sum, answer) => sum + answer.point,
      0
    );

    const matchedBand = scoreBands.find(
      (band) => totalScore >= band.minPoint && totalScore <= band.maxPoint
    );

    if (matchedBand) {
      try {
        await postUserQuiz(totalScore, matchedBand);
      } catch (err) {
        alert("Failed to save quiz result. Please try again.");
        return;
      }

      const matchedRoadmap = roadmaps.find((roadmap) => {
        const roadmapId = roadmap._id.$oid || roadmap._id;
        const scoreBandRoadmapId =
          matchedBand.roadmapId.$oid || matchedBand.roadmapId._id;
        return roadmapId === scoreBandRoadmapId;
      });

      if (matchedRoadmap) {
        const roadmapServices = matchedRoadmap.serviceId
          .map((serviceId) => {
            const serviceIdValue =
              typeof serviceId === "string" ? serviceId : serviceId.$oid;
            return services.find(
              (service) => (service._id.$oid || service._id) === serviceIdValue
            );
          })
          .filter((service) => service);

        const result = {
          totalScore,
          typeOfSkin: matchedBand.typeOfSkin,
          skinExplanation: matchedBand.skinExplanation,
          roadmapServices,
        };
        setQuizResult(result);
        setModalVisible(true);
      } else {
        alert("No matching roadmap found for your score band.");
      }
    } else {
      alert("No matching score band found for your score.");
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(selectedAnswers).length !== quizzes.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    await checkScoreBand(selectedAnswers);
  };

  const renderQuiz = (quiz) => (
    <View style={styles.card} key={quiz.id}>
      <Text style={styles.questionTitle}>{quiz.title}</Text>
      {quiz.answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.answerOption,
            selectedAnswers[quiz.id]?.title === answer.title &&
            styles.selectedAnswer,
          ]}
          onPress={() => handleAnswerSelect(quiz.id, answer)}
        >
          <Text style={styles.answerText}>{answer.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Skin Quiz</Text>
      <ScrollView style={styles.list}>
        {quizzes.map((quiz) => renderQuiz(quiz))}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Your Skin Assessment</Text>
            {quizResult && (
              <>
                <Text style={styles.modalText}>
                  Total Score: {quizResult.totalScore}
                </Text>
                <Text style={styles.modalText}>
                  Skin Type: {quizResult.typeOfSkin}
                </Text>
                <Text style={styles.modalText}>
                  Explanation: {quizResult.skinExplanation}
                </Text>
                {quizResult.roadmapServices.length === 0 && (
                  <Text style={styles.modalText}>
                    No services available for your roadmap at the moment.
                  </Text>
                )}
              </>
            )}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                // Reset quiz data
                setSelectedAnswers({});
                setQuizResult(null);
                setModalVisible(false); // Close the modal
                navigation.navigate("Treatment"); // Navigate back to Treatment
              }}
            >
              <Ionicons name="home-outline" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Return to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roadmapButton,
                quizResult?.roadmapServices.length === 0 && styles.disabledButton,
              ]}
              onPress={() => {
                if (quizResult?.roadmapServices.length === 0) return;
                setModalVisible(false);
                navigation.navigate("RoadmapScreen", {
                  services: quizResult?.roadmapServices || [],
                });
              }}
              disabled={quizResult?.roadmapServices.length === 0}
            >
              <Ionicons name="map-outline" size={20} color="#FFF" />
              <Text style={styles.buttonText}>View Your Roadmap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F07D87",
    margin: 15,
    textAlign: "center",
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  answerOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F9F9F9",
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedAnswer: {
    backgroundColor: "#D1E8FF",
    borderColor: "#007AFF",
  },
  answerText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  submitButton: {
    backgroundColor: "#F07D87",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: "center",
    marginVertical: 20,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%", // Slightly wider for better spacing
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
    textAlign: "center",
    lineHeight: 22,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F07D87",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    width: "80%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E06D77",
  },
  roadmapButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F07D87",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
    width: "80%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E06D77",
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
    borderColor: "#B0B0B0",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
});