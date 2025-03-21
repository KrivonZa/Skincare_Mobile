import React, { useState, useEffect } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../hooks/axiosInstance";

export function EditAccount() {
  const navigation = useNavigation();
  const route = useRoute();
  // Nếu có dữ liệu từ route, dùng luôn; nếu không thì sẽ fetch sau
  const { userData: routeUserData } = route.params || {};

  const [accountId, setAccountId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(""); 
  const [phone, setPhone] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const populateUserData = (data) => {
    setAccountId(data._id || "");
    setUsername(data.username || "");
    setEmail(data.email || "");
    if (data.dob) {
      // Giả sử dob có định dạng ISO "yyyy-mm-dd" hoặc "yyyy-mm-ddT..."
      const isoDate = data.dob.split("T")[0];
      const parts = isoDate.split("-");
      if (parts.length === 3) {
        const [year, month, day] = parts;
        setDob(`${day} ${month} ${year}`); 
      }
    }
    setPhone(data.phone || "");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) throw new Error("No authentication token found");
        const response = await api.get("/account/profileJWT", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && response.data.user) {
          populateUserData(response.data.user);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (routeUserData) {
      populateUserData(routeUserData);
    } else {
      fetchUserData();
    }
  }, [routeUserData]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        if (!value.trim()) error = "Username is required";
        else if (value.length < 2) error = "Username must be at least 2 characters";
        break;
      case "dob":
        if (!value.trim()) error = "Date of birth is required";
        else if (!/^\d{2}\s\d{2}\s\d{4}$/.test(value))
          error = "DOB must be in format dd mm yyyy";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^\d{10,12}$/.test(value))
          error = "Enter a valid phone number with 10 to 12 digits";
        break;
        case "oldPassword":

          if ((newPassword || confirmPassword) && !value.trim())
            error = "Current password is required to change password";
          break;
        case "newPassword":

          if ((oldPassword || confirmPassword) && !value.trim())
            error = "New password is required";
          else if (oldPassword && value === oldPassword)
            error = "New password must be different from current password";
          break;
        case "confirmPassword":

          if ((oldPassword || newPassword) && value !== newPassword)
            error = "Passwords do not match";
          break;
        
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (name, value) => {
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "dob":
        setDob(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "oldPassword":
        setOldPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
    validateField(name, value);
  };

  const convertDob = (input) => {
    const parts = input.split(/\s+/);
    if (parts.length !== 3) return null;
    const [dd, mm, yyyy] = parts;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  };

  const handleSave = async () => {
    const validUsername = validateField("username", username);
    const validDob = validateField("dob", dob);
    const validPhone = validateField("phone", phone);
    let validOldPassword = true,
      validNewPassword = true,
      validConfirmPassword = true;
    if (oldPassword || newPassword || confirmPassword) {
      validOldPassword = validateField("oldPassword", oldPassword);
      validNewPassword = validateField("newPassword", newPassword);
      validConfirmPassword = validateField("confirmPassword", confirmPassword);
    }
    if (
      validUsername &&
      validDob &&
      validPhone &&
      validOldPassword &&
      validNewPassword &&
      validConfirmPassword
    ) {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) throw new Error("No authentication token found");

        console.log("Token:", token);

        const convertedDob = convertDob(dob);
        if (!convertedDob) throw new Error("Invalid date format");

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const patchResponse = await api.patch(
          `/account/updateProfileJWT/${accountId}`,
          {
            username,
            dob: convertedDob,
            phone,
          }
        );
        console.log("Profile update response:", patchResponse.data);

        if (oldPassword && newPassword) {
          const postResponse = await api.post(
            "/account/changePasswordJWT",
            {
              
              currentPassword: oldPassword,
              newPassword: newPassword,
            }
          );
          console.log("Password change response:", postResponse.data);
        }

        Alert.alert("Success", "Profile updated successfully!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } catch (err) {
        console.error(
          "Error updating profile:",
          err.response ? err.response.data : err
        );
        let errorMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        "Something went wrong";

      if (errorMessage.toLowerCase().includes("current password")) {
        errorMessage = "Your current password is wrong";
      }
      Alert.alert("Error", errorMessage);
    }
  } else {
    Alert.alert("Error", "Please correct all fields before saving.");
  }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Happy_smiley_face.png/640px-Happy_smiley_face.png",
            }}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.sectionTitle}>User Information</Text>

        <View style={styles.formField}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, errors.username && styles.inputError]}
            value={username}
            onChangeText={(text) => handleChange("username", text)}
            placeholder="Enter username"
          />
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, { color: "#999" }]}
            value={email}
            editable={false}
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Date of Birth (dd mm yyyy)</Text>
          <TextInput
            style={[styles.input, errors.dob && styles.inputError]}
            value={dob}
            onChangeText={(text) => handleChange("dob", text)}
            placeholder="dd mm yyyy"
          />
          {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            value={phone}
            onChangeText={(text) => handleChange("phone", text)}
            placeholder="(+84) XXXXXXXXXXX"
            keyboardType="phone-pad"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        <Text style={styles.sectionTitle}>Change Password</Text>

        <View style={styles.formField}>
          <Text style={styles.label}>Old Password</Text>
          <TextInput
            style={[styles.input, errors.oldPassword && styles.inputError]}
            value={oldPassword}
            onChangeText={(text) => handleChange("oldPassword", text)}
            placeholder="Enter old password"
            secureTextEntry
          />
          {errors.oldPassword && <Text style={styles.errorText}>{errors.oldPassword}</Text>}
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={[styles.input, errors.newPassword && styles.inputError]}
            value={newPassword}
            onChangeText={(text) => handleChange("newPassword", text)}
            placeholder="Enter new password"
            secureTextEntry
          />
          {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            value={confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            placeholder="Confirm new password"
            secureTextEntry
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 16 },
  profileImageContainer: { alignItems: "center", marginVertical: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E86464",
    marginTop: 20,
    marginBottom: 10,
  },
  formField: { marginBottom: 15 },
  label: { fontSize: 14, color: "#999", marginBottom: 5 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
    fontSize: 16,
    color: "#333",
  },
  inputError: { borderBottomColor: "red" },
  errorText: { color: "red", fontSize: 12, marginTop: 5 },
  saveButton: {
    backgroundColor: "#E86464",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
