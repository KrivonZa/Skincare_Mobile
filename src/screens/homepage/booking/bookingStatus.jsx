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

export function BookingStatus() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Booking Status</Text>
      <Button
        title="Booking Detail"
        onPress={() => navigation.navigate("BookingDetail")}
      ></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
