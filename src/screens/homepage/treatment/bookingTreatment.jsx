import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

export function BookingTreatment({ route }) {
  const { treatment } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            source={{ uri: treatment.image }}
            style={styles.image}
          />
          <Text style={styles.title}>{treatment.title}</Text>
          <Text style={styles.description}>{treatment.description}</Text>
          <Text style={styles.detail}>Time: {treatment.time}</Text>
          <Text style={styles.detail}>Price: {treatment.price}</Text>
          <TouchableOpacity style={styles.bookButton}
            accessibilityLabel={`Book ${treatment.title}`}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    marginTop: 44,
    padding: 22,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  treatmentImage: {
    borderRadius: 10,
    aspectRatio: 1.63,
    width: '100%',
  },
  treatmentTitle: {
    color: 'rgba(237, 102, 114, 1)',
    fontSize: 18,
    fontFamily: 'Nobile, sans-serif',
    textAlign: 'center',
    marginTop: 10,
  },
  treatmentDescription: {
    color: 'rgba(117, 117, 117, 1)',
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 16,
  },
  treatmentDetail: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 4,
  },
  bookButton: {
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 14,
    width: 160,
    paddingVertical: 9,
    backgroundColor: 'rgba(237, 102, 114, 1)',
  },
  bookButtonText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
  },
});

