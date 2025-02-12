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
    title: "Can I Erase My Under Eye Bags?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet quisque eu mauris, ut dolor diam...",
    image:
      "https://s3-alpha-sig.figma.com/img/f08d/ed94/004de3fc45814df9df8c0ff216c96811?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lorv03AsU1KFopfEFB11hpUG1yXxVJjHOc0nqAq6q4ttGeNjITZU968dm7UifrqZEbAr4z5EDMj1yObnF3rGUltk-BnmxCu5OPUeWQeornNfZcDUeb3U1315LqKx3HP~nHW9nY9YvU0clkHR3v9soO4VWJcTJcpXqVbezCaEThKQKvABo7HoZs0LmCHyM1bMkt1eSb8xRfu2LZ4fNxckz1zmyH5DyrsyfC0xyHPr7x5JLplNqcdnA6XA1afylNt8OuUt3yG6RrWPKkLjVdpoQzTE2TrBtxfyqwg0BieBAboCvI8eZmhq5VRd2eY2XB7hjDhdZxd3T-xeZze-zHQvPA__",
  },
  {
    id: "2",
    title: "These Skin Care Trends Will Be Everywhere in 2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet quisque eu mauris, ut dolor diam...",
    image:
      "https://s3-alpha-sig.figma.com/img/f08d/ed94/004de3fc45814df9df8c0ff216c96811?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lorv03AsU1KFopfEFB11hpUG1yXxVJjHOc0nqAq6q4ttGeNjITZU968dm7UifrqZEbAr4z5EDMj1yObnF3rGUltk-BnmxCu5OPUeWQeornNfZcDUeb3U1315LqKx3HP~nHW9nY9YvU0clkHR3v9soO4VWJcTJcpXqVbezCaEThKQKvABo7HoZs0LmCHyM1bMkt1eSb8xRfu2LZ4fNxckz1zmyH5DyrsyfC0xyHPr7x5JLplNqcdnA6XA1afylNt8OuUt3yG6RrWPKkLjVdpoQzTE2TrBtxfyqwg0BieBAboCvI8eZmhq5VRd2eY2XB7hjDhdZxd3T-xeZze-zHQvPA__",
  },
  {
    id: "3",
    title: "The Best Beauty Hacks For Women Over 40",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet quisque eu mauris, ut dolor diam...",
    image:
      "https://s3-alpha-sig.figma.com/img/f08d/ed94/004de3fc45814df9df8c0ff216c96811?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lorv03AsU1KFopfEFB11hpUG1yXxVJjHOc0nqAq6q4ttGeNjITZU968dm7UifrqZEbAr4z5EDMj1yObnF3rGUltk-BnmxCu5OPUeWQeornNfZcDUeb3U1315LqKx3HP~nHW9nY9YvU0clkHR3v9soO4VWJcTJcpXqVbezCaEThKQKvABo7HoZs0LmCHyM1bMkt1eSb8xRfu2LZ4fNxckz1zmyH5DyrsyfC0xyHPr7x5JLplNqcdnA6XA1afylNt8OuUt3yG6RrWPKkLjVdpoQzTE2TrBtxfyqwg0BieBAboCvI8eZmhq5VRd2eY2XB7hjDhdZxd3T-xeZze-zHQvPA__",
  },
];

export function Blogs() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.treatmentCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.treatmentImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitleOrange}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("TreatmentDetails")}
        >
          <Text style={styles.cardText}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.treatmentSection}>
      <Text style={styles.treatmentTitle}>News & Promo</Text>
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
        <Text style={styles.viewAllTreatmentButton}>View all News & Promo</Text>
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
  cardTitleOrange: {
    fontSize: 20,
    fontWeight: "bold",
    color: "orange",
    marginBottom: 8,
  },
  cardText: {
    color: "blue",
    fontSize: 14,
    fontWeight: "600",
  },
});
