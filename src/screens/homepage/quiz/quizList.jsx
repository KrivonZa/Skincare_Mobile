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

export function QuizStatus() {
  const navigation = useNavigation();
  const [quizzes, setQuizzes] = useState([]);
  const [scoreBands, setScoreBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  // Lấy dữ liệu câu hỏi và scoreband từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");

        // Lấy danh sách câu hỏi
        const quizResponse = await api.get("/question", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const formattedQuizzes = quizResponse.data.map((quiz) => ({
          id: quiz._id,
          title: quiz.title || "Untitled Quiz",
          answers: quiz.answers || [],
        }));
        setQuizzes(formattedQuizzes);

        // Lấy danh sách scoreband
        const scoreBandResponse = await api.get("/scoreband", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScoreBands(scoreBandResponse.data);

        setSelectedAnswers({}); // Reset câu trả lời mỗi khi vào trang
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch data: ", err);
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

  // Xử lý khi nhấn nút Submit
  const handleSubmit = () => {
    // Kiểm tra nếu tất cả câu hỏi đã được trả lời
    if (Object.keys(selectedAnswers).length !== quizzes.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Tính tổng điểm và kiểm tra scoreband
    checkScoreBand(selectedAnswers);
  };

  // Kiểm tra totalScore với scoreband
  const checkScoreBand = (answers) => {
    const totalScore = Object.values(answers).reduce(
      (sum, answer) => sum + answer.point,
      0
    );

    // Tìm scoreband phù hợp
    const matchedBand = scoreBands.find(
      (band) => totalScore >= band.minPoint && totalScore <= band.maxPoint
    );

    if (matchedBand) {
      const result = {
        totalScore,
        typeOfSkin: matchedBand.typeOfSkin,
        skinExplanation: matchedBand.skinExplanation,
      };
      setQuizResult(result);
      setModalVisible(true); // Hiển thị modal khi có kết quả
    } else {
      alert("No matching score band found for your score.");
    }
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
          {/* Bỏ hiển thị điểm số */}
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
        {/* Nút Submit */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal hiển thị kết quả */}
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
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("LandingPage"); // Điều hướng đến LandingPage
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
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
  closeButton: {
    marginTop: 20,
    backgroundColor: "#F07D87",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
