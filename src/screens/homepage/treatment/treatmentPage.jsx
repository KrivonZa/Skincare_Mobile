import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function TreatmentPage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Treatmen Page</Text>
      <Button
        title="Booking Treatment"
        onPress={() => navigation.navigate("BookingTreatment")}
      ></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
