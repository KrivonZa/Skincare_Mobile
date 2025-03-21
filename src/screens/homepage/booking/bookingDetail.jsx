import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../../hooks/axiosInstance";
import { Calendar } from "react-native-calendars";

export function BookingDetail() {
  const navigation = useNavigation();
  const [therapists, setTherapists] = useState([]);
  const [slots, setSlots] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const route = useRoute();
  const { appointment } = route.params;

  const fetchData = async () => {
    try {
      const response1 = await api.get(`/therapist/by-service/${appointment.detail._id}`);
      setTherapists(response1.data);
      const response2 = await api.get(`/slots`);
      setSlots(response2.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchShifts = async (therapistId) => {
    try {
      const response = await api.get(`/shifts/therapist/upcoming/${therapistId}`);
      setShifts(response.data);
    } catch (error) {
      console.error("Error fetching shifts:", error);
    }
  };

  const isSlotAvailable = (slot, date) => {
    const selectedDateTime = new Date(`${date}T${slot.startTime}:00`);
    return !shifts.some((shift) => {
      const shiftDate = new Date(shift.date);
      return (
        shift.slotsId._id === slot._id &&
        shiftDate.toDateString() === selectedDateTime.toDateString()
      );
    });
  };

  const renderTherapistDetails = () => {
    // Tính ngày mai
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Available Therapists</Text>
        <FlatList
          data={therapists}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.therapistItem}
              onPress={() => {
                setSelectedTherapist(item);
                setSelectedDate("");
                setSelectedSlot(null);
                fetchShifts(item._id);
              }}
            >
              <Text style={styles.therapistName}>{item.accountId.username}</Text>
              <Text style={styles.therapistExperience}>{item.experience}</Text>
            </TouchableOpacity>
          )}
          scrollEnabled={false} // Tắt scroll của FlatList để ScrollView bên ngoài quản lý
        />

        {selectedTherapist && (
          <>
            <Text style={styles.subTitle}>Select Date</Text>
            <Calendar
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
                setSelectedSlot(null);
              }}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: "#F07D87" },
              }}
              minDate={minDate} // Chỉ cho phép chọn từ ngày mai
            />

            {selectedDate && (
              <>
                <Text style={styles.subTitle}>Available Slots</Text>
                <FlatList
                  data={slots}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => {
                    const available = isSlotAvailable(item, selectedDate);
                    return (
                      <TouchableOpacity
                        style={[
                          styles.slotItem,
                          !available && styles.slotDisabled,
                          selectedSlot?._id === item._id && styles.slotSelected,
                        ]}
                        onPress={() => available && setSelectedSlot(item)}
                        disabled={!available}
                      >
                        <Text
                          style={[
                            styles.slotText,
                            !available && styles.slotTextDisabled,
                          ]}
                        >
                          {item.startTime} - {item.endTime}
                        </Text>
                        {!available && (
                          <Text style={styles.slotStatus}>Booked</Text>
                        )}
                      </TouchableOpacity>
                    );
                  }}
                  scrollEnabled={false} // Tắt scroll của FlatList
                />
              </>
            )}

            {selectedSlot && (
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => {
                  const bookingData = {
                    therapistId: selectedTherapist._id,
                    slotsId: selectedSlot._id,
                    serviceId: appointment.detail._id,
                    date: `${selectedDate}T${selectedSlot.startTime}:00.000Z`,
                    treatment: appointment.detail,
                  };
                  navigation.navigate("Payment", { bookingData });
                }}
              >
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    );
  };

  const renderBasicInfo = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Booking Information</Text>
      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={20} color="#F07D87" />
        <Text style={styles.infoText}>Date: {appointment.date}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={20} color="#F07D87" />
        <Text style={styles.infoText}>
          Time: {appointment.time} ({appointment.duration})
        </Text>
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
              <Text style={styles.imagePlaceholder}>
                Image: {appointment.checkinImage}
              </Text>
            ) : (
              <Text style={styles.imagePlaceholder}>No Check-in Image</Text>
            )}
          </View>
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Check-out</Text>
            {appointment.checkoutImage ? (
              <Text style={styles.imagePlaceholder}>
                Image: {appointment.checkoutImage}
              </Text>
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
        return renderTherapistDetails();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {renderBasicInfo()}
          {renderContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContent: {
    flexGrow: 1, // Đảm bảo nội dung trong ScrollView có thể mở rộng
    paddingBottom: 20, // Thêm padding để tránh nội dung bị cắt ở dưới
  },
  content: {
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
  subTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginVertical: 10,
  },
  therapistItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  therapistName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  therapistExperience: {
    fontSize: 14,
    color: "#666",
  },
  slotItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#F07D87",
    borderRadius: 5,
    marginBottom: 10,
  },
  slotSelected: {
    backgroundColor: "#F07D87",
  },
  slotDisabled: {
    backgroundColor: "#D3D3D3",
    borderColor: "#D3D3D3",
  },
  slotText: {
    fontSize: 14,
    color: "#333",
  },
  slotTextDisabled: {
    color: "#666",
  },
  slotStatus: {
    fontSize: 12,
    color: "#FFF",
  },
  bookButton: {
    backgroundColor: "#F07D87",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  bookButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
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

const getStatusColor = (status) => {
  switch (status) {
    case "Scheduled": return "#F07D87";
    case "In Progress": return "#FFB6C1";
    case "Completed": return "#98FB98";
    case "Cancelled": return "#D3D3D3";
    default: return "#F07D87";
  }
};

export default BookingDetail;