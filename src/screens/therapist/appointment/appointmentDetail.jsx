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

export function AppointmentDetail() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Text>AppointmentDetail</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
