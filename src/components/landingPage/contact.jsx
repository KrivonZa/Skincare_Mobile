import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Contact() {
  const navigation = useNavigation();

  return (
    <View style={styles.bookingContentDown}>
      <Text style={styles.treatSkin}>Ready to treat your skin?</Text>
      <Text style={styles.chooseTreatment}>
        Choose your Treatment and Book Now.
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("ViewAllTreatment")}>
        <Text style={styles.bookNowUp}>Book now</Text>
      </TouchableOpacity>

      <Text style={styles.treatSkin}>Consult your skin</Text>
      <Text style={styles.chooseTreatmentDown}>Your email</Text>
      <TextInput
        style={styles.inputEmail}
        placeholder="Type here"
        placeholderTextColor="white"
        keyboardType="email-address"
        multiline={true}
        numberOfLines={5}
      />
      <Text style={styles.chooseTreatmentDown}>Your message</Text>
      <TextInput
        style={styles.inputMessage}
        placeholder="Type here"
        placeholderTextColor="white"
        multiline={true}
        numberOfLines={5}
      />
      <TouchableOpacity onPress={() => navigation.navigate("ViewAllTreatment")}>
        <Text style={styles.bookNow}>Send message</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bookingContentDown: {
    backgroundColor: "#F06B7E",
    paddingTop: 40,
    paddingBottom: 40,
    display: "flex",
    alignItems: "Left",
  },
  inputEmail: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "white",
    padding: 10,
    marginHorizontal: 20,
    fontSize: 16,
    textAlignVertical: "top",
  },
  inputMessage: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "white",
    padding: 10,
    marginHorizontal: 20,
    fontSize: 16,
    textAlignVertical: "top",
    height: 120,
  },
  treatSkin: {
    fontSize: 24,
    color: "white",
    marginBottom: 10,
    lineHeight: 24,
    textAlign: "center",
  },
  chooseTreatment: {
    marginTop: 10,
    fontSize: 14,
    color: "white",
    lineHeight: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  chooseTreatmentDown: {
    marginTop: 10,
    fontSize: 14,
    color: "white",
    lineHeight: 14,
    textAlign: "left",
    marginBottom: 15,
    marginLeft: 30,
  },
  bookNowUp: {
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: "center",
    color: "#F06B7E",
  },
  bookNow: {
    backgroundColor: "white",
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: "center",
    color: "#F06B7E",
  },
});
