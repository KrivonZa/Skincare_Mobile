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

// Updated dummy data with additional fields
const dummyAppointments = [
  {
    id: "1",
    service: "Facial Cleansing",
    date: "2025-03-15",
    time: "10:00 AM",
    duration: "1h",
    price: 50,
    status: "Scheduled",
    slot: "Morning",
  },
  {
    id: "2",
    service: "Hydrating Mask",
    date: "2025-03-16",
    time: "2:00 PM",
    duration: "45m",
    price: 40,
    status: "In Progress",
    slot: "Afternoon",
    checkinImage: "https://example.com/checkin1.jpg",
    checkoutImage: "https://example.com/checkout1.jpg",
  },
  {
    id: "3",
    service: "Chemical Peel",
    date: "2025-03-17",
    time: "11:30 AM",
    duration: "1.5h",
    price: 80,
    status: "Completed",
    slot: "Morning",
    payment: { method: "Credit Card", amount: 80, date: "2025-03-17" },
  },
  {
    id: "4",
    service: "Microdermabrasion",
    date: "2025-03-18",
    time: "3:00 PM",
    duration: "1h",
    price: 60,
    status: "Cancelled",
    slot: "Afternoon",
  },
  {
    id: "5",
    service: "Acne Treatment",
    date: "2025-03-19",
    time: "9:30 AM",
    duration: "1h",
    price: 55,
    status: "Scheduled",
    slot: "Morning",
  },
  // Add more if needed...
];

export function BookingStatus() {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (filter === "All") {
      setAppointments(dummyAppointments);
    } else {
      setAppointments(dummyAppointments.filter((appt) => appt.status === filter));
    }
  }, [filter]);

  const renderAppointment = (appt) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("BookingDetail", { appointment: appt })}
      key={appt.id}
    >
      <Text style={styles.service}>{appt.service}</Text>
      <View style={styles.details}>
        <Ionicons name="calendar-outline" size={16} color="#F07D87" />
        <Text>{appt.date} - {appt.time}</Text>
      </View>
      <Text style={[styles.status, { backgroundColor: getStatusColor(appt.status) }]}>
        {appt.status}
      </Text>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled": return "#F07D87";
      case "In Progress": return "#FFB6C1";
      case "Completed": return "#98FB98";
      case "Cancelled": return "#D3D3D3";
      default: return "#F07D87";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Booking Status</Text>
      <View style={styles.filterContainer}>
        {["All", "Scheduled", "In Progress", "Completed", "Cancelled"].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.filterButtonActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.list}>
        {appointments.map((appt) => renderAppointment(appt))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
});