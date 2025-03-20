// LandingPage.jsx
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import {
  Treatment,
  Benefit,
  Testimonial,
  Blogs,
  Contact,
} from "../../components/landingPage";
import { FirstLoginBanner } from "../../components/landingPage/FirstLoginBanner";
import api from "../../hooks/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function LandingPage() {
  const navigation = useNavigation();
  const [showFirstLoginBanner, setShowFirstLoginBanner] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Fetch user profile
  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await api.get("/account/profileJWT", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      });
      const accountData = response.data.user; 
      setCurrentAccount(accountData);
      setShowFirstLoginBanner(accountData?.firstTimeLogin);
    } catch (err) {
      setError("Failed to fetch profile: " + err.message);
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  }, []); 

  // Update first login status
  const updateFirstLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await api.patch(
        `/account/updateProfileJWT/${currentAccount._id}`, {
          
            firstTimeLogin: false,
            // id: currentAccount._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        },
       
      );

      const updatedAccount = response.data.user; // Access nested user object
      setCurrentAccount(updatedAccount);
      setShowFirstLoginBanner(updatedAccount.firstTimeLogin); // Update banner state
    } catch (err) {
      setError("Failed to update profile: " + err.message);
      console.error("Error updating profile:", err);
    }
  };

  // Fetch profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{error}</Text>
        <TouchableOpacity onPress={fetchUserProfile}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  console.log("Rendering - Show Banner:", showFirstLoginBanner); // Debug

  return (
    <SafeAreaView style={styles.container}>
      {/* Wrap banner and content in a relative container */}
      <View style={{ flex: 1, position: "relative" }}>
        {showFirstLoginBanner && (
          <FirstLoginBanner
            onSkip={() => {
              console.log("Skip triggered from LandingPage");
              updateFirstLoginStatus();
            }}
            onTakeQuiz={updateFirstLoginStatus}
          />
        )}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.firstSection}>
            <Text style={styles.brandName}>Crystal Care</Text>
            <Text style={styles.tagline}>Beauty has never been easier.</Text>
            <TouchableOpacity
              style={styles.learnMoreButton}
              onPress={() => navigation.navigate("About")}
            >
              <Text style={styles.buttonText}>Learn about us</Text>
            </TouchableOpacity>
          </View>
  
          <Treatment />
          <Benefit />
          <Testimonial />
  
          <View style={styles.bookingContent}>
            <Text style={styles.quote}>
              "Our skin is a reflection of our inner well-being. At Crystal Care, we nurture its natural beauty."
            </Text>
            <View style={styles.circle}></View>
            <Text style={styles.founder}>
              Dr. Arimbi Aditya, Founder of Crystal Care.
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
            <Text style={styles.openTime}>Mon-Fri : 7:30 AM – 17:30 PM</Text>
          </View>
          <Contact />
        </ScrollView>
      </View>
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

export default LandingPage;