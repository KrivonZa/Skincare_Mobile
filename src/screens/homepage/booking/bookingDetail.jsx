import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export function BookingDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { appointment } = route.params;

  const renderBasicInfo = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Booking Information</Text>
      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={20} color="#F07D87" />
        <Text style={styles.infoText}>Date: {appointment.date}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={20} color="#F07D87" />
        <Text style={styles.infoText}>Time: {appointment.time} ({appointment.duration})</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="pricetag-outline" size={20} color="#F07D87" />
        <Text style={styles.infoText}>Price: ${appointment.price}</Text>
      </View>
    </View>
  );

  const renderScheduled = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Scheduled Appointment</Text>
      <View style={styles.calendarContainer}>
        <Ionicons name="calendar" size={30} color="#F07D87" />
        <View style={styles.calendarDetails}>
          <Text style={styles.calendarText}>Date: {appointment.date}</Text>
          <Text style={styles.calendarText}>Slot: {appointment.slot}</Text>
          <Text style={styles.calendarText}>Time: {appointment.time}</Text>
        </View>
      </View>
      <Text style={styles.note}>Please arrive 10 minutes early.</Text>
    </View>
  );

  const renderInProgress = () => (
    <>
      {renderScheduled()}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Check-in/Check-out Progress</Text>
        <View style={styles.imageSection}>
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Check-in</Text>
            {appointment.checkinImage ? (
              <Text style={styles.imagePlaceholder}>Image: {appointment.checkinImage}</Text>
            ) : (
              <Text style={styles.imagePlaceholder}>No Check-in Image</Text>
            )}
          </View>
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Check-out</Text>
            {appointment.checkoutImage ? (
              <Text style={styles.imagePlaceholder}>Image: {appointment.checkoutImage}</Text>
            ) : (
              <Text style={styles.imagePlaceholder}>No Check-out Image</Text>
            )}
          </View>
        </View>
      </View>
    </>
  );

  const renderCompleted = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Payment Summary</Text>
      <View style={styles.paymentContainer}>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Method:</Text>
          <Text style={styles.paymentValue}>{appointment.payment.method}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Amount:</Text>
          <Text style={styles.paymentValue}>${appointment.payment.amount}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Date:</Text>
          <Text style={styles.paymentValue}>{appointment.payment.date}</Text>
        </View>
      </View>
    </View>
  );

  const renderCancelled = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Cancelled Booking</Text>
      <Text style={styles.note}>This appointment was cancelled.</Text>
    </View>
  );

  const renderContent = () => {
    switch (appointment.status) {
      case "Scheduled":
        return renderScheduled();
      case "In Progress":
        return renderInProgress();
      case "Completed":
        return renderCompleted();
      case "Cancelled":
        return renderCancelled();
      default:
        return <Text style={styles.note}>No additional details available.</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderBasicInfo()}
        {renderContent()}
      </View>
    </SafeAreaView>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case "Scheduled": return "#F07D87";
    case "In Progress": return "#FFB6C1";
    case "Completed": return "#98FB98";
    case "Cancelled": return "#D3D3D3";
    default: return "#F07D87";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#F07D87",
    marginLeft: 10,
  },
  headerStatus: {
    fontSize: 12,
    color: "#FFF",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F07D87",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  calendarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#F07D87",
    borderRadius: 8,
  },
  calendarDetails: {
    flex: 1,
  },
  calendarText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  imageSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageWrapper: {
    alignItems: "center",
    width: "48%",
  },
  imageLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  imagePlaceholder: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  paymentContainer: {
    padding: 10,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: "#666",
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  note: {
    fontSize: 12,
    color: "#666",
    marginTop: 10,
  },
});