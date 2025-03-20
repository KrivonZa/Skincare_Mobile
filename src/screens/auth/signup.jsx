import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import api from "../../hooks/axiosInstance";

export function Signup() {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');

  // Format DOB as user types (DD-MM-YYYY)
  const formatDob = (text) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = '';
    if (cleaned.length > 0) {
      formatted = cleaned.substring(0, 2);
    }
    if (cleaned.length >= 3) {
      formatted += '-' + cleaned.substring(2, 4);
    }
    if (cleaned.length >= 5) {
      formatted += '-' + cleaned.substring(4, 8);
    }
    return formatted;
  };

  // Convert DD-MM-YYYY to YYYY-MM-DD for backend
  const convertDobForBackend = (dobString) => {
    const [day, month, year] = dobString.split('-');
    return `${year}-${month}-${day}`;
  };

  // Validate DOB
  const validateDob = (dobString) => {
    const [day, month, year] = dobString.split('-');
    const date = new Date(year, month - 1, day);
    return (
      date.getDate() === parseInt(day) &&
      date.getMonth() === parseInt(month) - 1 &&
      date.getFullYear() === parseInt(year) &&
      date <= new Date()
    );
  };

  const handleDobChange = (text) => {
    const formatted = formatDob(text);
    setDob(formatted);
  };

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      if (!username || !email || !password || !dob || !phone) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      
      if (!/^\d{2}-\d{2}-\d{4}$/.test(dob) || !validateDob(dob)) {
        Alert.alert('Error', 'Please enter a valid date of birth (DD-MM-YYYY)');
        return;
      }

      setIsLoading(true);

      // Convert DOB to backend format
      const backendDob = convertDobForBackend(dob);
      console.log('Attempting signup with:', { username, email, password, dob: backendDob, phone });

      const response = await api.post('/account/register', {
        username,
        email,
        password,
        dob: backendDob, // YYYY-MM-DD format for backend
        phone,
      });
      
      navigation.navigate("Login");
      
    } catch (error) {
      console.log('Axios Error:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        } : 'No response available',
        request: error.request ? error.request : 'No request details',
        config: error.config,
      });
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Something went wrong';
      Alert.alert('Signup Error', errorMessage);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formSignup}>
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#a1a1a1"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#a1a1a1"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0, borderRadius: 0 }]}
            placeholder="Password"
            placeholderTextColor="#a1a1a1"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="#a1a1a1"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0, borderRadius: 0 }]}
            placeholder="Confirm Password"
            placeholderTextColor="#a1a1a1"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Ionicons
              name={confirmPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="#a1a1a1"
            />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Date of Birth (DD-MM-YYYY)"
          placeholderTextColor="#a1a1a1"
          value={dob}
          onChangeText={handleDobChange}
          keyboardType="numeric"
          maxLength={10}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#a1a1a1"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TouchableOpacity 
          style={[styles.signupButton, isLoading && { opacity: 0.7 }]}
          onPress={handleSignup}
          disabled={isLoading}
        >
          <Text style={styles.signupButtonText}>
            {isLoading ? 'Registering...' : 'Register'}
          </Text>
        </TouchableOpacity>

        <View style={styles.loginRedirect}>
          <Text style={styles.loginText}>Already have account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff909a",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  formSignup: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingRight: 10,
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: "#ff6f71",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#333",
  },
  loginLink: {
    color: "#ff6f71",
    fontWeight: "bold",
  },
});