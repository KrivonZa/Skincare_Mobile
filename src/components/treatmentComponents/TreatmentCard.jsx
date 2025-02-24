import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const TreatmentCard = ({ treatment }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.cardContainer}>
            <Image
                resizeMode="contain"
                source={{ uri: treatment.image }}
                style={styles.treatmentImage}
                accessibilityLabel={`Image of ${treatment.title}`}
            />
            <Text style={styles.treatmentTitle}>{treatment.title}</Text>
            <Text style={styles.treatmentDescription}>{treatment.description}</Text>
            <Text style={styles.treatmentDetail}>Estimate Treatment Time: {treatment.time}</Text>
            <Text style={styles.treatmentDetail}>Price: {treatment.price}</Text>
            <TouchableOpacity style={styles.bookButton}
                onPress={() => navigation.navigate('BookingTreatment', { treatment })}
                accessibilityLabel={`Book ${treatment.title}`}
            >
                <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
        </View>
    );
};

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

export default TreatmentCard;