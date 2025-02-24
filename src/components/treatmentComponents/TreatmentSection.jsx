import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TreatmentCard from './TreatmentCard';


const treatments = [
  {
    id: 1,
    title: 'Ultrasonic Scrubbing',
    image: 'https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/daf6d61956cc9dbc2e23ad1d6325a339a6de1db99b9caadae3e20f1a31d41047?apiKey=41aab81e665b459d8a900c6a1ab04494&',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui molestie tellus tincidunt at at sed egestas nam. Eleifend volutpat at morbi habitant consequat. Ipsum eget nam a aliquet elit sit sit.',
    time: '45 Minutes',
    price: '240.000',
  },
  {
    id: 2,
    title: 'Dermalogica Face Peel',
    image: 'https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/78b851642536acb37c9671cf5d04cf5eba53bc96259ca7e5afe9fc3a3d222e74?apiKey=41aab81e665b459d8a900c6a1ab04494&',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui molestie tellus tincidunt at at sed egestas nam. Eleifend volutpat at morbi habitant consequat. Ipsum eget nam a aliquet elit sit sit.',
    time: '75 Minutes',
    price: '200.000 VND',
  },
  {
    id: 3,
    title: 'Micro Dermabrasion',
    image: 'https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/1db650a37d69d03cb8ccfcc065c62bc4bf61669cc28f679d63f090abb8f903b8?apiKey=41aab81e665b459d8a900c6a1ab04494&',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui molestie tellus tincidunt at at sed egestas nam. Eleifend volutpat at morbi habitant consequat. Ipsum eget nam a aliquet elit sit sit.',
    time: '60 Minutes',
    price: '250.000 VND',
  },
  {
    id: 4,
    title: 'Mini Facial',
    image: 'https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/fd010ce283a4a1d93fd6c77c3be9ae27069ea03dda2dcc89c321000eba51f7d8?apiKey=41aab81e665b459d8a900c6a1ab04494&',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui molestie tellus tincidunt at at sed egestas nam. Eleifend volutpat at morbi habitant consequat. Ipsum eget nam a aliquet elit sit sit.',
    time: '30 Minutes',
    price: '150.000 VND',
  },
  {
    id: 5,
    title: 'Carbon Laser Treatment',
    image: 'https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/b8627168348fe801cded141cd4a2e9c32b491423707caf070087ea2e362c9763?apiKey=41aab81e665b459d8a900c6a1ab04494&',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui molestie tellus tincidunt at at sed egestas nam. Eleifend volutpat at morbi habitant consequat. Ipsum eget nam a aliquet elit sit sit.',
    time: '45 Minutes',
    price: ' 200.000 VND',
  },
  {
    id: 6,
    title: 'Facial LED Light Therapy',
    image: 'https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/a46e26f78ab5a40598f0a6aff3c3bed2a7d0ab7e47224f7fa3bfdc19c571eb6c?apiKey=41aab81e665b459d8a900c6a1ab04494&',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui molestie tellus tincidunt at at sed egestas nam. Eleifend volutpat at morbi habitant consequat. Ipsum eget nam a aliquet elit sit sit.',
    time: '70 Minutes',
    price: '350.000 VND',
  },
];

const TreatmentSection = () => {
  return (
    <View style={styles.treatmentContainer}>
      <View style={styles.treatmentContent}>
        <Text style={styles.sectionTitle}>Treatment</Text>
        <Text style={styles.sectionSubtitle}>Give you the best services We can give.</Text>
        <ScrollView>
          {treatments.map((treatment) => (
            <TreatmentCard key={treatment.id} treatment={treatment} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  treatmentContainer: {
    zIndex: 0,
    width: '100%',
  },
  treatmentContent: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    paddingHorizontal: 41,
    paddingVertical: 65,
  },
  sectionTitle: {
    color: 'rgba(66, 56, 56, 1)',
    fontSize: 36,
    fontFamily: 'Nobile, sans-serif',
    textAlign: 'center',
  },
  sectionSubtitle: {
    color: 'rgba(66, 56, 56, 1)',
    fontSize: 20,
    fontFamily: 'Nobile, sans-serif',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 20,
  },
});

export default TreatmentSection;