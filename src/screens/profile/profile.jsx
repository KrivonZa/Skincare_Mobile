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

export function Profile() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Button
        title="Edit Account"
        onPress={() => navigation.navigate("EditAccount")}
      ></Button>
      <Button
        title="Quiz Record"
        onPress={() => navigation.navigate("QuizRecord")}
      ></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
