import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function BookingDetail() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        headerShown: true,
      });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Booking Detail</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
