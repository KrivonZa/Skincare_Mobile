// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   FlatList,
//   ActivityIndicator,
// } from "react-native";
// import { useState, useEffect } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import api from "../../hooks/axiosInstance";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export function QuizRecord() {
//   const navigation = useNavigation();
//   const [quizRecords, setQuizRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);



//   const fetchQuizRecords = async () => {
//     try {
//       setLoading(true);
//       const userString = await AsyncStorage.getItem('user'); // Wait for the Promise to resolve
//       const user = JSON.parse(userString);
//       console.log(user)
//       const accountId = user?.user?.id;
//       const response = await api.get(`/userQuiz/by-account?accountId=${accountId}`, {
//         // params: {
//         //   accountId: accountId,
//         // },
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       });

//       setQuizRecords(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchQuizRecords();
//   }, []);

//   const renderQuizItem = ({ item }) => (
//     <View style={styles.quizItem}>
//       <Text style={styles.quizDate}>
//         {new Date(item.createdAt).toLocaleDateString()}
//       </Text>
//       <Text style={styles.quizScore}>
//         Total Score: {item.totalPoint || "N/A"}
//       </Text>
//       {item.scoreBandId && (
//         <Text style={styles.scoreBand}>
//           Band: {item.scoreBandId.name || "N/A"}
//         </Text>
//       )}
//       <Text style={styles.resultsTitle}>Quiz Results:</Text>
//       {item.result.map((result) => (
//         <View key={result._id} style={styles.resultItem}>
//           <Text style={styles.question}>{result.title}</Text>
//           <Text style={styles.answer}>
//             Answer: {result.answer} (Points: {result.point})
//           </Text>
//         </View>
//       ))}
//     </View>
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ActivityIndicator size="large" color="#ff909a" />
//       </SafeAreaView>
//     );
//   }



//   return (
//     <SafeAreaView style={styles.container}>
//       {quizRecords.length === 0 ? (
//         <Text style={styles.noRecords}>No quiz records found</Text>
//       ) : (
//         <FlatList
//           data={quizRecords}
//           renderItem={renderQuizItem}
//           keyExtractor={(item) => item._id.toString()}
//           contentContainerStyle={styles.listContainer}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#ff909a",
//     marginLeft: 15,
//   },
//   listContainer: {
//     padding: 15,
//   },
//   quizItem: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   quizDate: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 5,
//   },
//   quizScore: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#ff909a",
//     marginBottom: 5,
//   },
//   scoreBand: {
//     fontSize: 14,
//     color: "#333",
//     marginBottom: 10,
//   },
//   resultsTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#ff909a",
//     marginTop: 5,
//     marginBottom: 5,
//   },
//   resultItem: {
//     marginLeft: 10,
//     marginBottom: 8,
//   },
//   question: {
//     fontSize: 14,
//     color: "#333",
//     fontWeight: "500",
//   },
//   answer: {
//     fontSize: 14,
//     color: "#666",
//   },
//   noRecords: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   errorText: {
//     fontSize: 16,
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   retryButton: {
//     backgroundColor: "#ff909a",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 20,
//     alignSelf: "center",
//   },
//   retryButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../../hooks/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function QuizRecord() {
  const navigation = useNavigation();
  const [quizRecords, setQuizRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuizRecords = async () => {
    try {
      setLoading(true);
      const userString = await AsyncStorage.getItem("user");
      if (!userString) throw new Error("No user data found");
      const user = JSON.parse(userString);
      console.log("User data:", user);
      const accountId = user?.user?.id; // Fixed from .id to ._id to match response
      const response = await api.get(`/userQuiz/by-account?accountId=${accountId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setQuizRecords(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizRecords();
  }, []);

  const renderQuizItem = ({ item }) => (
    <View style={styles.quizItem}>
      <Text style={styles.quizDate}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
      <Text style={styles.quizScore}>
        Total Score: {item.totalPoint || "N/A"}
      </Text>
      {item.scoreBandId && (
        <>
          <Text style={styles.scoreBand}>
            Band: {item.scoreBandId.minPoint} - {item.scoreBandId.maxPoint}
          </Text>
          <Text style={styles.skinType}>
            Skin Type: {item.scoreBandId.typeOfSkin || "N/A"}
          </Text>
          <Text style={styles.skinExplanation}>
            {item.scoreBandId.skinExplanation || "No explanation available"}
          </Text>
        </>
      )}
      <Text style={styles.resultsTitle}>Quiz Results:</Text>
      {item.result.map((result) => (
        <View key={result._id} style={styles.resultItem}>
          <Text style={styles.question}>{result.title}</Text>
          <Text style={styles.answer}>
            Answer: {result.answer} (Points: {result.point})
          </Text>
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#ff909a" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchQuizRecords}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {quizRecords.length === 0 ? (
        <Text style={styles.noRecords}>No quiz records found</Text>
      ) : (
        <FlatList
          data={quizRecords}
          renderItem={renderQuizItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff909a",
    marginLeft: 15,
  },
  listContainer: {
    padding: 15,
  },
  quizItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quizDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  quizScore: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff909a",
    marginBottom: 5,
  },
  scoreBand: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  skinType: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    marginBottom: 5,
  },
  skinExplanation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff909a",
    marginTop: 5,
    marginBottom: 5,
  },
  resultItem: {
    marginLeft: 10,
    marginBottom: 8,
  },
  question: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  answer: {
    fontSize: 14,
    color: "#666",
  },
  noRecords: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  retryButton: {
    backgroundColor: "#ff909a",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});