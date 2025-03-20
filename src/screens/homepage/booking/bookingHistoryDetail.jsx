import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export function BookingHistoryDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { appointment } = route.params;
  const [formattedData, setFormattedData] = useState(null);

  useEffect(() => {
    if (appointment?.fullData) {
      setFormattedData({
        id: appointment.id,
        service: appointment.service,
        therapist: appointment.therapist,
        status: appointment.status,
        amount: appointment.amount,
        checkInImage: appointment.checkInImage,
        checkOutImage: appointment.checkOutImage,
        notes: appointment.notes,
        username: appointment.fullData.userInfo?.username || "N/A",
        userEmail: appointment.fullData.userInfo?.email || "N/A",
        userPhone: appointment.fullData.userInfo?.phone || "N/A",
        date: appointment.date || "N/A",
        time: appointment.time || "N/A",
      });
    } else {
      const data = appointment;
      setFormattedData({
        id: data._id,
        service: data.service.serviceName,
        therapist: data.therapist.therapistName,
        therapistEmail: data.therapist.therapistEmail,
        status: data.appointment.status,
        amount: data.appointment.amount,
        checkInImage: data.appointment.checkInImage,
        checkOutImage: data.appointment.checkOutImage,
        notes: data.appointment.notes,
        username: data.userInfo?.username || "N/A",
        userEmail: data.userInfo?.email || "N/A",
        userPhone: data.userInfo?.phone || "N/A",
        date: "N/A",
        time: "N/A",
      });
    }
  }, [appointment]);

  if (!formattedData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text>Loading appointment details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderBasicInfo = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Booking Information</Text>
      <View style={styles.infoRow}>
        <Ionicons name="medkit-outline" size={20} color="#F07D87" />
        <Text style={styles.infoText}>Service: {formattedData.service}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="person-outline" size={20} color="#F07D87" />
        <Text style={styles.infoText}>
          Therapist: {formattedData.therapist}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="cash-outline" size={20} color="#F07D87" />
        <Text style={styles.infoText}>Amount: ${formattedData.amount}</Text>
      </View>
    </View>
  );

  const renderClientInfo = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Client Information</Text>
      <View style={styles.infoRow}>
        <Ionicons name="person-outline" size={20} color="#F07D87" />
        <Text style={styles.infoText}>Name: {formattedData.username}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="mail-outline" size={20} color="#F07D87" />
        <Text style={styles.infoText}>Email: {formattedData.userEmail}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="call-outline" size={20} color="#F07D87" />
        <Text style={styles.infoText}>Phone: {formattedData.userPhone}</Text>
      </View>
    </View>
  );

  const renderStatus = () => {
    const status = formattedData.status;
    return (
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(status) },
          ]}
        >
          {status}
        </Text>
      </View>
    );
  };

  const renderInProgress = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Treatment Progress</Text>
      <View style={styles.progressContainer}>
        <View style={styles.imageSection}>
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Check-in</Text>
            {formattedData.checkInImage ? (
              <Image
                source={{ uri: formattedData.checkInImage }}
                style={styles.checkImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.noImagePlaceholder}>
                <Ionicons name="image-outline" size={24} color="#CCC" />
                <Text style={styles.noImageText}>No Check-in Image</Text>
              </View>
            )}
          </View>
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Check-out</Text>
            {formattedData.checkOutImage ? (
              <Image
                source={{ uri: formattedData.checkOutImage }}
                style={styles.checkImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.noImagePlaceholder}>
                <Ionicons name="image-outline" size={24} color="#CCC" />
                <Text style={styles.noImageText}>Not checked out yet</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  const renderNotes = () => {
    if (!formattedData.notes) return null;

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Treatment Notes</Text>
        <View style={styles.notesContainer}>
          <Ionicons
            name="document-text-outline"
            size={20}
            color="#F07D87"
            style={styles.notesIcon}
          />
          <Text style={styles.notesText}>{formattedData.notes}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {renderStatus()}
        {renderBasicInfo()}
        {renderClientInfo()}
        {formattedData.status === "InProgress" && renderInProgress()}
        {renderNotes()}
      </ScrollView>
    </SafeAreaView>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 15,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 15,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  statusBadge: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EEE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F07D87",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  progressContainer: {
    padding: 5,
  },
  imageSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageWrapper: {
    width: "48%",
  },
  imageLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  checkImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  noImagePlaceholder: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
    borderStyle: "dashed",
  },
  noImageText: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  },
  notesContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
  },
  notesIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  notesText: {
    flex: 1,
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },
});
