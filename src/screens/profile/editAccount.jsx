// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
// } from "react-native";
// import { useState, useEffect, useRef } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// export function EditAccount() {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text>Edit Account</Text>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function EditAccount() {
  const navigation = useNavigation();
  
  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Error states
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
  });

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^$$\+62$$\s\d{11}$/;
    return phoneRegex.test(phone);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (!value.trim()) {
          error = "First name is required";
        } else if (value.length < 2) {
          error = "First name must be at least 2 characters";
        }
        break;

      case "lastName":
        if (!value.trim()) {
          error = "Last name is required";
        } else if (value.length < 2) {
          error = "Last name must be at least 2 characters";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!validateEmail(value)) {
          error = "Please enter a valid email";
        }
        break;

      case "gender":
        if (!value.trim()) {
          error = "Gender is required";
        } else if (!["Male", "Female", "Other"].includes(value)) {
          error = "Please select a valid gender";
        }
        break;

      case "phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!validatePhone(value)) {
          error = "Please enter a valid Indonesian phone number";
        }
        break;

      case "address":
        if (!value.trim()) {
          error = "Address is required";
        } else if (value.length < 10) {
          error = "Please enter a complete address";
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return error === "";
  };

  // Handle input changes with validation
  const handleChange = (name, value) => {
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
    validateField(name, value);
  };

  const handleSave = () => {
    // Validate all fields
    const firstNameValid = validateField("firstName", firstName);
    const lastNameValid = validateField("lastName", lastName);
    const emailValid = validateField("email", email);
    const genderValid = validateField("gender", gender);
    const phoneValid = validateField("phone", phone);
    const addressValid = validateField("address", address);

    // Check if all validations pass
    if (firstNameValid && lastNameValid && emailValid && 
        genderValid && phoneValid && addressValid) {
      // Proceed with save
      Alert.alert(
        "Success",
        "Profile updated successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } else {
      Alert.alert(
        "Error",
        "Please check all fields and try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Picture Section */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Happy_smiley_face.png/640px-Happy_smiley_face.png" }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* User Information Section */}
        <Text style={styles.sectionTitle}>User Information</Text>
        
        <View style={styles.formRow}>
          <View style={styles.formColumn}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={[styles.input, errors.firstName && styles.inputError]}
              value={firstName}
              onChangeText={(text) => handleChange("firstName", text)}
              placeholder="Enter first name"
            />
            {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
          </View>
          <View style={styles.formColumn}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={[styles.input, errors.lastName && styles.inputError]}
              value={lastName}
              onChangeText={(text) => handleChange("lastName", text)}
              placeholder="Enter last name"
            />
            {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
          </View>
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            placeholder="Enter email"
            autoCapitalize="none"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        <View style={styles.formRow}>
          <View style={styles.formColumn}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={[styles.input, errors.gender && styles.inputError]}
              value={gender}
              onChangeText={(text) => handleChange("gender", text)}
              placeholder="Enter gender"
            />
            {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
          </View>
          <View style={styles.formColumn}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              value={phone}
              onChangeText={(text) => handleChange("phone", text)}
              keyboardType="phone-pad"
              placeholder="(+62) XXXXXXXXXXX"
            />
            {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
          </View>
        </View>

        {/* Address Section */}
        <Text style={styles.sectionTitle}>Address</Text>
        
        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={20} color="#E86464" style={styles.addressIcon} />
          <TextInput
            style={[styles.addressInput, errors.address && styles.inputError]}
            value={address}
            onChangeText={(text) => handleChange("address", text)}
            multiline
            placeholder="Enter complete address"
          />
        </View>
        {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: "#E86464",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E86464",
    marginTop: 20,
    marginBottom: 10,
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formColumn: {
    width: "48%",
  },
  formField: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#999",
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
    fontSize: 16,
    color: "#333",
  },
  inputError: {
    borderBottomColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
  },
  addressIcon: {
    marginRight: 10,
  },
  addressInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#E86464",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});