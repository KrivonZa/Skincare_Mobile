import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Treatment,
  Benefit,
  Testimonial,
  Blogs,
  Contact,
} from "../../components/landingPage";

export function LandingPage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.firstSection}>
          <Text style={styles.brandName}>Crystal Care</Text>
          <Text style={styles.tagline}>
            Làm đẹp chưa bao giờ dễ dàng đến thế.
          </Text>
          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={() => navigation.navigate("About")}
          >
            <Text style={styles.buttonText}>Tìm hiểu về chúng tôi</Text>
          </TouchableOpacity>
        </View>

        <Treatment />
        <Benefit />
        <Testimonial />

        <View style={styles.bookingContent}>
          <Text style={styles.quote}>
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit. In turpis
            interdum lectus nibh at euismod.”
          </Text>
          <View style={styles.circle}></View>
          <Text style={styles.founder}>
            dr. Arimbi Aditya, Founder of Metime Skincare.
          </Text>
        </View>

        <Blogs />

        <View style={styles.openHours}>
          <Text style={styles.openTitle}>Open Hours</Text>
          <Text style={styles.openSubtitle}>
            If you feel tired and stressed after a working day, we are happy to
            give you an enjoyable and healthy solution to find your balance
            again.
          </Text>
          <Text style={styles.openTime}>Mon-Fri : 9 AM – 4 PM</Text>
          <Text style={styles.openTime}>Mon-Fri : 9 AM – 4 PM</Text>
          <Text style={styles.openTime}>Mon-Fri : 9 AM – 4 PM</Text>
        </View>
        <Contact />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  firstSection: {
    backgroundColor: "#F06B7E",
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  brandName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 24,
  },
  learnMoreButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#F06B7E",
    fontSize: 16,
    fontWeight: "600",
  },
  bookingContent: {
    backgroundColor: "#fce1e5",
    paddingTop: 40,
    paddingBottom: 40,
    display: "flex",
    alignItems: "center",
  },
  quote: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    lineHeight: 20,
    textAlign: "center",
  },
  founder: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
    lineHeight: 14,
    textAlign: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 24,
    backgroundColor: "white",
  },
  openTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F06B7E",
    marginBottom: 8,
    textAlign: "left",
    marginLeft: 10,
    marginTop: 30,
  },
  openSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    lineHeight: 24,
    textAlign: "left",
    marginLeft: 10,
  },
  openTime: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    lineHeight: 14,
    textAlign: "left",
    marginLeft: 10,
  },
});
