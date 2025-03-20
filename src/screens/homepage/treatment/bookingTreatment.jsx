import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const HEADER_HEIGHT = 250;

export function BookingTreatment({ route }) {
  const { treatment } = route.params;
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({ title: treatment.serviceName });
  }, []);

  // Calculate parallax effect for the header image
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT / 3],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Parallax Header */}
        <View style={styles.headerContainer}>
          <Animated.Image
            source={{
              uri: treatment.image || "https://via.placeholder.com/800x500",
            }}
            style={[
              styles.headerImage,
              { transform: [{ translateY: headerTranslateY }] },
            ]}
          />
          <View style={styles.overlay} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{treatment.serviceName}</Text>
            <Text style={styles.description}>{treatment.description}</Text>

            <View style={styles.priceContainer}>
              <Ionicons name="pricetag-outline" size={24} color="#F06B7E" />
              <Text style={styles.priceText}>${treatment.price}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Service Details</Text>
              <Text style={styles.sectionText}>
                Our {treatment.serviceName} treatment is performed by certified
                professionals using premium products. Each session is customized
                to your specific skin needs.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What to Expect</Text>
              <Text style={styles.sectionText}>
                • Professional consultation{"\n"}• Customized treatment approach
                {"\n"}• Premium quality products{"\n"}• Post-treatment care
                instructions{"\n"}• Follow-up recommendations
              </Text>
            </View>

            <TouchableOpacity
              style={styles.bookButton}
              onPress={() =>
                navigation.navigate("BookingDetail", {
                  appointment: {
                    service: treatment.serviceName,
                    price: treatment.price,
                    date: "Select date",
                    time: "Select time",
                    duration: treatment.time || "90 Minutes",
                    status: "New Booking",
                  },
                })
              }
            >
              <Text style={styles.bookButtonText}>Book This Service</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    width: width,
    height: HEADER_HEIGHT + 60,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  infoContainer: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 10,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F06B7E",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  bookButton: {
    backgroundColor: "#F06B7E",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 30,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
