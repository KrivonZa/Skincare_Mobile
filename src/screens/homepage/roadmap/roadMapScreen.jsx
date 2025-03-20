import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export function RoadmapScreen({ route }) {
  const { services } = route.params; // Nhận danh sách service từ QuizStatus
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Skin Care Roadmap</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {services.map((service, index) => (
          <View key={index} style={styles.stepContainer}>
            {/* Step Indicator */}
            <View style={styles.stepIndicator}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              {index < services.length - 1 && <View style={styles.stepLine} />}
            </View>

            {/* Service Card */}
            <TouchableOpacity
              style={styles.serviceCard}
              onPress={() =>
                navigation.navigate("BookingTreatment", { treatment: service })
              }
            >
              <Image
                source={{
                  uri: service.image || "https://via.placeholder.com/150",
                }}
                style={styles.serviceImage}
              />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.serviceName}</Text>
                <Text style={styles.servicePrice}>${service.price}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#F07D87",
    margin: 15,
    textAlign: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  stepIndicator: {
    alignItems: "center",
    marginRight: 15,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F07D87",
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  stepLine: {
    width: 2,
    height: 60,
    backgroundColor: "#F07D87",
    marginTop: 5,
  },
  serviceCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  serviceInfo: {
    flex: 1,
    justifyContent: "center",
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 14,
    color: "#666",
  },
});
