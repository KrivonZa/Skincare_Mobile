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
import { useEffect, useState } from "react";
import api from "../../hooks/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;


// Dữ liệu mẫu
// const treatmentData = [
//   {
//     id: "1",
//     title: "Dermabrasion",
//     description:
//       "This is a surgical procedure that uses a rotating instrument to remove the outer layers of skin, usually on the face.",
//     image:
//       "https://s3-alpha-sig.figma.com/img/5248/de06/7c67a715bd33a9ac75f58db3823815bd?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Tpd4X7xJuWxk5Rmg-lROfQz34FSFYXFx6XRJWQ8QZxF9jS9dMPt~ed1uRySvYyyWDUAlbcEYhx-xn5qSJs2uEIwOGJDrgbfEG8GAt2QhKyyBOJvEplPwyRNKrdseMLrO4yjGHj2ZH3gGbfgtrv7aDEktf~EFw4O~M11fw6uSZibEPwZQj1zZWJxFkBlk6ooG-n-1fT29p14OHkhrsiREz1lITY52KmKoYL~4meeTIcviOcykfezCF47a-xB7GbbHF58~48BR~DHbWm985VoxvEmZaDTtnJeZWQMxYyMZ1aOK14OHxP760hFMk2B9jMDGLG5K89IXpzK2arW05A3H9g__",
//   },
//   {
//     id: "2",
//     title: "Facial Mask Lightening",
//     description:
//       "This is a surgical procedure to treat scars and winkles. Doctors perform it in an office or clinic. You will have a local anesthetic...",
//     image:
//       "https://s3-alpha-sig.figma.com/img/5248/de06/7c67a715bd33a9ac75f58db3823815bd?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Tpd4X7xJuWxk5Rmg-lROfQz34FSFYXFx6XRJWQ8QZxF9jS9dMPt~ed1uRySvYyyWDUAlbcEYhx-xn5qSJs2uEIwOGJDrgbfEG8GAt2QhKyyBOJvEplPwyRNKrdseMLrO4yjGHj2ZH3gGbfgtrv7aDEktf~EFw4O~M11fw6uSZibEPwZQj1zZWJxFkBlk6ooG-n-1fT29p14OHkhrsiREz1lITY52KmKoYL~4meeTIcviOcykfezCF47a-xB7GbbHF58~48BR~DHbWm985VoxvEmZaDTtnJeZWQMxYyMZ1aOK14OHxP760hFMk2B9jMDGLG5K89IXpzK2arW05A3H9g__",
//   },
//   {
//     id: "3",
//     title: "Ultrasonic Scrubbing",
//     description:
//       "This is a surgical procedure to treat scars and winkles. Doctors perform it in an office or clinic. You will have a local anesthetic...",
//     image:
//       "https://s3-alpha-sig.figma.com/img/5248/de06/7c67a715bd33a9ac75f58db3823815bd?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Tpd4X7xJuWxk5Rmg-lROfQz34FSFYXFx6XRJWQ8QZxF9jS9dMPt~ed1uRySvYyyWDUAlbcEYhx-xn5qSJs2uEIwOGJDrgbfEG8GAt2QhKyyBOJvEplPwyRNKrdseMLrO4yjGHj2ZH3gGbfgtrv7aDEktf~EFw4O~M11fw6uSZibEPwZQj1zZWJxFkBlk6ooG-n-1fT29p14OHkhrsiREz1lITY52KmKoYL~4meeTIcviOcykfezCF47a-xB7GbbHF58~48BR~DHbWm985VoxvEmZaDTtnJeZWQMxYyMZ1aOK14OHxP760hFMk2B9jMDGLG5K89IXpzK2arW05A3H9g__",
//   },
// ];



export function Treatment() {
  const navigation = useNavigation();
  const [treatmentData, setTreatmentData] = useState([]);
  useEffect(() => {
    const fetchTreatmentData = async () => {
      try {
        const response = await api.get("/service", {
         Authorization: `Bearer ${AsyncStorage.getItem("accessToken")}`,
        });
        setTreatmentData(response.data);
      } catch (error) {
        console.error("Failed to fetch treatment data: ", error);
      }
    }
  fetchTreatmentData();
  },[]);

  const renderItem = ({ item }) => (
    <View style={styles.treatmentCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.treatmentImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.serviceName}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => navigation.navigate("TreatmentDetails")}
        >
          <Text style={styles.cardButtonText}>Learn more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.treatmentSection}>
      <Text style={styles.treatmentTitle}>Therapy</Text>
      <Text style={styles.treatmentSubtitle}>
        Providing you with the best therapeutic services
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
        <Text style={styles.viewAllTreatmentButton}>View all services</Text>
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
