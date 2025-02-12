import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

// Dữ liệu mẫu
const treatmentData = [
  {
    id: "1",
    title: "Andien",
    description:
      "This is a surgical procedure that uses a rotating instrument to remove the outer layers of skin, usually on the face.",
    image:
      "https://s3-alpha-sig.figma.com/img/a3a0/91c4/e8eb94c62ba383a7e597f3c4cec069b2?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tWkGFeOiiddcEEsk2fToIW8PMNHmOdZ0LJjJnm5An7YsKnw26Its3W9gO5SVHv-IltynBZVjH3-0bggA6MZpgvsn6zWiTjRX0PYM~cxeeVLWpNGP6xE2vtp2B0VMM5aIFdgd8~mVMvrfbmvBhGRHaFOKOEevXEx6wuit1WLAtauTj49i~A-0siLWZpzDqCIKBaZ33N~ziWEekT9mP81T5nxI7zbz2Sv~HH1rbEclqqTo2vPe-EJgck8crtyE1V2-v~9OeQ6Z53oE7KLLJrBARR8otSEh0hs9pmz0Q-4Kx-EPTdarln73T3Pjyr0yXbT-2LkcK8ZXqVf6tVvAcpgDzw__",
  },
  {
    id: "2",
    title: "Aura Kasik",
    description:
      "This is a surgical procedure to treat scars and winkles. Doctors perform it in an office or clinic. You will have a local anesthetic...",
    image:
      "https://s3-alpha-sig.figma.com/img/a3a0/91c4/e8eb94c62ba383a7e597f3c4cec069b2?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tWkGFeOiiddcEEsk2fToIW8PMNHmOdZ0LJjJnm5An7YsKnw26Its3W9gO5SVHv-IltynBZVjH3-0bggA6MZpgvsn6zWiTjRX0PYM~cxeeVLWpNGP6xE2vtp2B0VMM5aIFdgd8~mVMvrfbmvBhGRHaFOKOEevXEx6wuit1WLAtauTj49i~A-0siLWZpzDqCIKBaZ33N~ziWEekT9mP81T5nxI7zbz2Sv~HH1rbEclqqTo2vPe-EJgck8crtyE1V2-v~9OeQ6Z53oE7KLLJrBARR8otSEh0hs9pmz0Q-4Kx-EPTdarln73T3Pjyr0yXbT-2LkcK8ZXqVf6tVvAcpgDzw__",
  },
  {
    id: "3",
    title: "Millik",
    description:
      "This is a surgical procedure to treat scars and winkles. Doctors perform it in an office or clinic. You will have a local anesthetic...",
    image:
      "https://s3-alpha-sig.figma.com/img/a3a0/91c4/e8eb94c62ba383a7e597f3c4cec069b2?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tWkGFeOiiddcEEsk2fToIW8PMNHmOdZ0LJjJnm5An7YsKnw26Its3W9gO5SVHv-IltynBZVjH3-0bggA6MZpgvsn6zWiTjRX0PYM~cxeeVLWpNGP6xE2vtp2B0VMM5aIFdgd8~mVMvrfbmvBhGRHaFOKOEevXEx6wuit1WLAtauTj49i~A-0siLWZpzDqCIKBaZ33N~ziWEekT9mP81T5nxI7zbz2Sv~HH1rbEclqqTo2vPe-EJgck8crtyE1V2-v~9OeQ6Z53oE7KLLJrBARR8otSEh0hs9pmz0Q-4Kx-EPTdarln73T3Pjyr0yXbT-2LkcK8ZXqVf6tVvAcpgDzw__",
  },
];

export function Testimonial() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.treatmentCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.treatmentImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => navigation.navigate("TreatmentDetails")}
        >
          <Text style={styles.cardButtonText}>Tìm hiểu thêm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.treatmentSection}>
      <Text style={styles.treatmentTitle}>Testimonial</Text>
      <Text style={styles.treatmentSubtitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <FlatList
        data={treatmentData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardContainer}
      />
      <TouchableOpacity onPress={() => navigation.navigate("ViewAllTreatment")}>
        <Text style={styles.viewAllTreatmentButton}>View all testimonial</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  treatmentSection: {
    padding: 20,
  },
  treatmentTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  treatmentSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    lineHeight: 24,
    textAlign: "center",
  },
  cardContainer: {
    paddingHorizontal: 10,
  },
  treatmentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    marginRight: 10,
    width: screenWidth * 0.67,
    marginVertical: 10,
  },
  treatmentImage: {
    width: "100%",
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  cardButton: {
    backgroundColor: "#F06B7E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  cardButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  viewAllTreatmentButton: {
    backgroundColor: "#F06B7E",
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: "center",
    color: "white",
  },
});
