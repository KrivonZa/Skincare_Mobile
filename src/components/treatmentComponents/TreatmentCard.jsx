import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const cardWidth = width > 500 ? 400 : width * 0.85;

const TreatmentCard = ({ treatment }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="cover"
          source={
            treatment?.images || treatment?.image
              ? { uri: treatment.images || treatment.image }
              : {
                  uri: "https://via.placeholder.com/300x200/FFBBBB/666666?text=Spa+Treatment",
                }
          }
          style={styles.treatmentImage}
          accessibilityLabel={`Image of ${
            treatment.serviceName || treatment.title
          }`}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.treatmentTitle}>
          {treatment.serviceName || treatment.title}
        </Text>

        <Text style={styles.treatmentDescription} numberOfLines={3}>
          {treatment.description}
        </Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#F06B7E" />
            <Text style={styles.treatmentDetail}>
              {treatment.time || "90 minutes"}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={16} color="#F06B7E" />
            <Text style={styles.treatmentDetail}>${treatment.price}</Text>
          </View>
        </View>

        <LinearGradient
          colors={["#F06B7E", "#F06B7E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.bookButtonGradient}
        >
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() =>
              navigation.navigate("BookingTreatment", { treatment })
            }
            accessibilityLabel={`Book ${
              treatment.serviceName || treatment.title
            }`}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    marginVertical: 15,
    backgroundColor: "#FFFFFF",
    width: cardWidth,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 7,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  treatmentImage: {
    aspectRatio: 1.63,
    width: "100%",
    height: undefined,
  },
  categoryTag: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(240, 107, 126, 0.85)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  contentContainer: {
    padding: 16,
  },
  treatmentTitle: {
    color: "#333",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  treatmentDescription: {
    color: "#757575",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  treatmentDetail: {
    color: "#555",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 5,
  },
  bookButtonGradient: {
    borderRadius: 30,
    marginTop: 5,
    overflow: "hidden",
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  bookButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    marginRight: 8,
  },
});

export default TreatmentCard;
