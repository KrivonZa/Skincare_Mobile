import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export function BookingStatus() {
  const navigation = useNavigation();
  const [filter, setFilter] = useState("All");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const userData = await AsyncStorage.getItem("user");
      const parsedData = userData ? JSON.parse(userData) : null;

      // Check various possible structures of the user data
      const user_id =
        parsedData?.id || parsedData?.user?.id || parsedData?.data?.id;

      if (!user_id) {
        console.log("User data structure:", JSON.stringify(parsedData));
        throw new Error("User information not available");
      }

      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/transaction/customer/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${parsedData.token}`,
          },
        }
      );

      if (response.data && response.data.data) {
        // Transform the API response into the format we need
        const formattedAppointments = response.data.data.map((item) => ({
          id: item._id,
          service: item.service.serviceName,
          therapist: item.therapist.therapistName,
          status: item.appointment.status,
          amount: item.appointment.amount,
          checkInImage: item.appointment.checkInImage,
          checkOutImage: item.appointment.checkOutImage,
          notes: item.appointment.notes,
          // You might want to add date and time handling here when available
          date: "N/A", // placeholder
          time: "N/A", // placeholder
          // Store the full item for detail view
          fullData: item,
        }));

        setAppointments(formattedAppointments);
      } else {
        setAppointments([]);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load your booking history. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filter appointments based on selected filter
  const filteredAppointments = appointments.filter(
    (appt) => filter === "All" || appt.status === filter
  );

  const renderAppointment = (appt) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("BookingHistoryDetail", { appointment: appt })
      }
      key={appt.id}
    >
      <Text style={styles.service}>{appt.service}</Text>
      <View style={styles.details}>
        <Ionicons name="calendar-outline" size={16} color="#F07D87" />
        <Text>
          {appt.date} - {appt.time}
        </Text>
      </View>
      <View style={styles.details}>
        <Ionicons name="person-outline" size={16} color="#F07D87" />
        <Text>{appt.therapist}</Text>
      </View>
      <Text
        style={[
          styles.status,
          { backgroundColor: getStatusColor(appt.status) },
        ]}
      >
        {appt.status}
      </Text>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "#F07D87";
      case "InProgress":
        return "#FFB6C1";
      case "Completed":
        return "#98FB98";
      case "Cancelled":
        return "#D3D3D3";
      default:
        return "#F07D87";
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#F07D87" />
        <Text style={styles.loadingText}>Loading your appointments...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Ionicons name="alert-circle-outline" size={50} color="#F07D87" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchTransactions}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Booking Status</Text>
      <View style={styles.filterContainer}>
        {["All", "Scheduled", "InProgress", "Completed", "Cancelled"].map(
          (f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterButton,
                filter === f && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.filterTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {filteredAppointments.length > 0 ? (
        <ScrollView style={styles.list}>
          {filteredAppointments.map((appt) => renderAppointment(appt))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="calendar-outline"
            size={60}
            color="#F07D87"
            opacity={0.5}
          />
          <Text style={styles.emptyText}>No appointments found</Text>
          <Text style={styles.emptySubtext}>
            {filter !== "All"
              ? `You don't have any ${filter} appointments`
              : "Book a treatment to get started"}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F07D87",
    margin: 15,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#F5F5F5",
  },
  filterButtonActive: {
    backgroundColor: "#F07D87",
  },
  filterText: {
    color: "#666",
    fontSize: 12,
  },
  filterTextActive: {
    color: "#FFF",
    fontWeight: "bold",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  service: {
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
  status: {
    fontSize: 12,
    color: "#FFF",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  errorText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: "#F07D87",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
});
