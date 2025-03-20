import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function QuizStatus() {
  const navigation = useNavigation();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm gọi API
  const fetchQuizzes = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api-docs/api/userQuiz"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }
      const data = await response.json();

      // Ánh xạ dữ liệu từ API
      const formattedQuizzes = data.map((quiz) => ({
        id: quiz._id,
        title: quiz.result.length > 0 ? quiz.result[0].title : "Untitled Quiz", // Lấy title từ câu hỏi đầu tiên hoặc mặc định
        totalPoint: quiz.totalPoint,
        
      }));

      setQuizzes(formattedQuizzes);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching quizzes:", err);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const renderQuiz = (quiz) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("QuizDetail", { quiz: quiz })}
      key={quiz.id}
    >
      <Text style={styles.title}>{quiz.title}</Text>
      {/* <View style={styles.details}>
        <Ionicons name="calendar-outline" size={16} color="#F07D87" />
        <Text>
          {quiz.date} - {quiz.time}
        </Text>
      </View> */}
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>Score: {quiz.totalPoint}/100</Text>
      </View>
    </TouchableOpacity>
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
      <Text style={styles.header}>Quiz Status</Text>
      <ScrollView style={styles.list}>
        {quizzes.map((quiz) => renderQuiz(quiz))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F07D87",
    margin: 15,
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginVertical: 6,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  score: {
    fontSize: 14,
    color: "#666",
  },
});
