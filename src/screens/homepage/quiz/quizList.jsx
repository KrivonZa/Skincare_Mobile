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

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        console.log("Access Token:", token);

        // Lấy danh sách câu hỏi
        console.log("Fetching /question...");
        try {
          const quizResponse = await api.get("/question", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Questions:", quizResponse.data);
          const formattedQuizzes = quizResponse.data.map((quiz) => ({
            id: quiz._id,
            title: quiz.title || "Untitled Quiz",
            answers: quiz.answers || [],
          }));
          setQuizzes(formattedQuizzes);
        } catch (err) {
          console.error(
            "Error fetching /question:",
            err.response?.status,
            err.response?.data
          );
        }

        // Lấy danh sách scoreband
        console.log("Fetching /scoreband...");
        try {
          const scoreBandResponse = await api.get("/scoreband", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("ScoreBands (raw):", scoreBandResponse.data);
          setScoreBands(scoreBandResponse.data);
        } catch (err) {
          console.error(
            "Error fetching /scoreband:",
            err.response?.status,
            err.response?.data
          );
        }

        // Lấy danh sách roadmap
        console.log("Fetching /roadmap...");
        try {
          const roadmapResponse = await api.get("/roadmap", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Roadmaps (raw):", roadmapResponse.data);
          setRoadmaps(roadmapResponse.data);
        } catch (err) {
          console.error(
            "Error fetching /roadmap:",
            err.response?.status,
            err.response?.data
          );
        }

        // Lấy danh sách service
        console.log("Fetching /service...");
        try {
          const serviceResponse = await api.get("/service", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Services (raw):", serviceResponse.data);
          // Lọc trùng lặp dựa trên _id.$oid
          const uniqueServices = Array.from(
            new Map(
              serviceResponse.data.map((service) => [
                service._id.$oid || service._id,
                service,
              ])
            ).values()
          );
          console.log("Unique Services:", uniqueServices);
          setServices(uniqueServices);
        } catch (err) {
          console.error(
            "Error fetching /service:",
            err.response?.status,
            err.response?.data
          );
          setServices([]);
        }

        setSelectedAnswers({});
      } catch (err) {
        console.error(
          "General error:",
          err.response?.status,
          err.response?.data
        );
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Xử lý khi chọn câu trả lời
  const handleAnswerSelect = (quizId, answer) => {
    const updatedAnswers = {
      ...selectedAnswers,
      [quizId]: { title: answer.title, point: answer.point },
    };
    setSelectedAnswers(updatedAnswers);
  };

  // Gửi dữ liệu lên API /userQuiz
  const postUserQuiz = async (totalScore, matchedBand) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      // Tạo mảng result từ quizzes và selectedAnswers
      const result = quizzes.map((quiz) => {
        const answer = selectedAnswers[quiz.id] || { title: "", point: 0 };
        return {
          title: quiz.title,
          answer: answer.title || "",
          point: answer.point || 0,
        };
      });

      // Tạo payload cho API /userQuiz
      const payload = {
        accountId: user._id,
        scoreBandId: matchedBand._id.$oid || matchedBand._id, // Lấy _id của scoreband
        result: result,
        totalPoint: totalScore,
      };

      console.log("Posting to /userQuiz with payload:", payload);

      // Gửi yêu cầu POST đến API /userQuiz
      const response = await api.post("/userQuiz", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Successfully posted to /userQuiz:", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error posting to /userQuiz:",
        err.response?.status,
        err.response?.data || err.message
      );
      throw err;
    }
  };

  // Kiểm tra totalScore với scoreband và tìm roadmap
  const checkScoreBand = async (answers) => {
    const totalScore = Object.values(answers).reduce(
      (sum, answer) => sum + answer.point,
      0
    );

    console.log("Total Score:", totalScore);

    const matchedBand = scoreBands.find(
      (band) => totalScore >= band.minPoint && totalScore <= band.maxPoint
    );

    if (matchedBand) {
      console.log("Matched ScoreBand:", matchedBand);
      console.log("ScoreBand roadmapId:", matchedBand.roadmapId);

      // Gửi dữ liệu lên API /userQuiz trước khi tiếp tục
      try {
        await postUserQuiz(totalScore, matchedBand);
      } catch (err) {
        alert("Failed to save quiz result. Please try again.");
        return; // Dừng lại nếu không gửi được dữ liệu lên API
      }

      // Tìm roadmap tương ứng với roadmapId
      const matchedRoadmap = roadmaps.find((roadmap) => {
        const roadmapId = roadmap._id.$oid || roadmap._id; // Xử lý cả trường hợp _id là chuỗi
        const scoreBandRoadmapId =
          matchedBand.roadmapId.$oid || matchedBand.roadmapId._id;
        console.log(
          `Comparing roadmap._id: ${roadmapId} with scoreBand.roadmapId: ${scoreBandRoadmapId}`
        );
        return roadmapId === scoreBandRoadmapId;
      });

      if (matchedRoadmap) {
        console.log("Matched Roadmap:", matchedRoadmap);

        // Lấy danh sách service từ serviceId trong roadmap
        const roadmapServices = matchedRoadmap.serviceId
          .map((serviceId, index) => {
            // serviceId có thể là chuỗi hoặc object có $oid
            const serviceIdValue =
              typeof serviceId === "string" ? serviceId : serviceId.$oid;
            const matchedService = services.find(
              (service) => (service._id.$oid || service._id) === serviceIdValue
            );
            console.log(
              `Service for serviceId[${index}] (${serviceIdValue}):`,
              matchedService
            );
            return matchedService;
          })
          .filter((service) => service);

        // Log để kiểm tra roadmapServices
        console.log("Service IDs in Roadmap:", matchedRoadmap.serviceId);
        console.log("Roadmap Services:", roadmapServices);
        console.log(
          "Roadmap Service Names:",
          roadmapServices.map((service) => service.serviceName)
        );

        const result = {
          totalScore,
          typeOfSkin: matchedBand.typeOfSkin,
          skinExplanation: matchedBand.skinExplanation,
          roadmapServices,
        };
        setQuizResult(result);
        setModalVisible(true);
      } else {
        console.log(
          "No matching roadmap found for roadmapId:",
          matchedBand.roadmapId
        );
        alert("No matching roadmap found for your score band.");
      }
    } else {
      console.log("No matching score band found for score:", totalScore);
      alert("No matching score band found for your score.");
    }
  };

  // Xử lý khi nhấn nút Submit
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
              style={[styles.backToHome]}
              onPress={() => navigation.navigate("DrawerNavigation")}
            >
              <Text style={styles.roadmapButtonText}>Back to Home</Text>
              {/* <Ionicons name="arrow-forward" size={24} color="#FFF" /> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roadmapButton,
                quizResult?.roadmapServices.length === 0 &&
                  styles.disabledButton,
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
              <Text style={styles.roadmapButtonText}>Your Road Map</Text>
              <Ionicons name="arrow-forward" size={24} color="#FFF" />
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
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  roadmapButton: {
    marginTop: 20,
    backgroundColor: "#F07D87",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  roadmapButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  backToHome: {
    backgroundColor: "#F07D87",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
  },
});
