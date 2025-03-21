// PaymentPage.jsx
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    TextInput,
    Alert,
  } from "react-native";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { useState } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import api from "../../hooks/axiosInstance";
  
  export function PaymentPage() {
    const navigation = useNavigation();
    const route = useRoute();
    const { bookingData } = route.params;
  
    const [notes, setNotes] = useState("");
  
    const handleBooking = () => {
      const finalBookingData = {
        therapistId: bookingData.therapistId,
        slotsId: bookingData.slotsId,
        serviceId: bookingData.serviceId,
        notes: notes,
        date: bookingData.date,
        paymentMethod: "Cash",
      };
  
      Alert.alert(
        "Confirm Booking",
        "Are you sure you want to book this appointment?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Confirm",
            onPress: async () => {
              try {
                // Gửi yêu cầu POST đến /transaction
                const response = await api.post("/transaction", finalBookingData);
  
                // Hiển thị thông báo thành công
                Alert.alert(
                  "Booking Successful",
                  "Your appointment has been booked successfully!",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        // Chuyển hướng sang trang BookingStatus
                        navigation.navigate("DrawerNavigation");
                      },
                    },
                  ]
                );
              } catch (error) {
                console.error("Error booking appointment:", error);
                // Hiển thị thông báo lỗi nếu có
                Alert.alert(
                  "Booking Failed",
                  "There was an error booking your appointment. Please try again."
                );
              }
            },
          },
        ]
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Booking Summary</Text>
  
            {/* Thông tin Treatment */}
            <View style={styles.infoRow}>
              <Ionicons name="pricetag-outline" size={20} color="#F07D87" />
              <Text style={styles.infoText}>
                Service: {bookingData.treatment.serviceName}
              </Text>
            </View>
            <Text style={styles.description}>
              {bookingData.treatment.description}
            </Text>
            <View style={styles.infoRow}>
              <Ionicons name="cash-outline" size={20} color="#F07D87" />
              <Text style={styles.infoText}>
                Price: ${bookingData.treatment.price}
              </Text>
            </View>
  
            {/* Thông tin ngày và giờ */}
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={20} color="#F07D87" />
              <Text style={styles.infoText}>
                Date: {new Date(bookingData.date).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={20} color="#F07D87" />
              <Text style={styles.infoText}>
                Time: {new Date(bookingData.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
  
            {/* Trường Notes */}
            <Text style={styles.subTitle}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Add any notes here (optional)"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />
  
            {/* Nút Booking */}
            <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
              <Text style={styles.bookButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
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
      flexGrow: 1,
      paddingBottom: 20,
    },
    card: {
      backgroundColor: "#FFF",
      borderRadius: 8,
      padding: 15,
      margin: 15,
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
    description: {
      fontSize: 14,
      color: "#666",
      marginBottom: 10,
    },
    subTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: "#333",
      marginVertical: 10,
    },
    notesInput: {
      borderWidth: 1,
      borderColor: "#EEE",
      borderRadius: 5,
      padding: 10,
      fontSize: 14,
      color: "#333",
      textAlignVertical: "top",
      marginBottom: 15,
    },
    bookButton: {
      backgroundColor: "#F07D87",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    bookButtonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "600",
    },
  });
  
  export default PaymentPage;