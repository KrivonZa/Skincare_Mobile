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
  
  export function LandingPage() {
    const navigation = useNavigation();
  
    return (
      <SafeAreaView style={styles.container}>
        <Text>Landing Page</Text>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  