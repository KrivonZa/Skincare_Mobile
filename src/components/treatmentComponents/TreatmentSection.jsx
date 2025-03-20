import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TreatmentCard from "./TreatmentCard";

const { width } = Dimensions.get("window");

const TreatmentSection = ({ treatments }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Facial", "Body", "Special"];

  // Animation value for header
  const scrollY = new Animated.Value(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 120],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070",
          }}
          style={styles.headerImage}
          imageStyle={{ opacity: 0.8 }}
        >
          <View style={styles.headerOverlay}>
            <Text style={styles.sectionTitle}>Beauty Treatments</Text>
            <Text style={styles.sectionSubtitle}>
              Experience our premium skincare services
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>

      {/* Category Selector */}
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        ></ScrollView>
      </View>

      {/* Treatments */}
      <Animated.ScrollView
        contentContainerStyle={styles.treatmentsContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {treatments.length > 0 ? (
          <View style={styles.cardsContainer}>
            {treatments.map((treatment) => (
              <View
                key={treatment._id || treatment.id}
                style={styles.cardWrapper}
              >
                <TreatmentCard treatment={treatment} />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="leaf-outline"
              size={60}
              color="#F06B7E"
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>No Treatments Found</Text>
            <Text style={styles.emptyText}>
              We're working on adding new treatments in this category.
            </Text>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={() => setActiveCategory("All")}
            >
              <Text style={styles.refreshButtonText}>View All Treatments</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 200,
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  headerOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left",
    marginBottom: 5,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  categoryContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryScroll: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  activeCategoryButton: {
    backgroundColor: "#F06B7E",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "#fff",
    fontWeight: "600",
  },
  treatmentsContainer: {
    padding: 15,
    paddingBottom: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardWrapper: {
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 30,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: "#F06B7E",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  refreshButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default TreatmentSection;
