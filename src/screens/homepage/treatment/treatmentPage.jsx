import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TreatmentSection from "../../../components/treatmentComponents/TreatmentSection";
import { useEffect, useState } from "react";
import axios from "axios";

export function TreatmentPage() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/service`
      );
      setTreatments(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching treatments:", err);
      setError("Failed to load treatments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.treatmentContainer, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#F06B7E" />
        <Text style={styles.loadingText}>Loading treatments...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.treatmentContainer, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchTreatments}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TreatmentSection treatments={treatments} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
