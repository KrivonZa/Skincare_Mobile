import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TreatmentSection from "../../../components/treatmentComponents/TreatmentSection";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import api from "../../../hooks/axiosInstance";
import FirstLoginBanner from "../../../components/landingPage/FirstLoginBanner";

export function TreatmentPage() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [showFirstLoginBanner, setShowFirstLoginBanner] = useState(false);
   const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/service`
      );
      setTreatments(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching treatments:", err);
      setError("Failed to load treatments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


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
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);


  if (loading) {
    return (
      <View style={[styles.treatmentContainer, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#F06B7E" />
        <Text style={styles.loadingText}>Loading treatments...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.treatmentContainer, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchTreatments}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {showFirstLoginBanner == true && (
        <FirstLoginBanner
          onSkip={() => {
            console.log("Skip triggered from LandingPage");
            updateFirstLoginStatus();
          }}
          onTakeQuiz={updateFirstLoginStatus}
        />
      )}
      <ScrollView>
        <TreatmentSection treatments={treatments} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
