import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from '../../hooks/axiosInstance';

export function Profile() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await api.get('/account/profileJWT', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        console.log('Fetched user data:', data);

        setUserData({
          username: data.user?.username || 'No Username',
          email: data.user?.email || 'No Email',
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth", params: { screen: "Login" } }],
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    {
      title: "Quiz Records",
      icon: "document-text-outline",
      screen: "QuizRecord",
    },
    {
      title: "Logout",
      icon: "log-out-outline",
      screen: "Logout",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth", params: { screen: "Login" } }],
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Happy_smiley_face.png/640px-Happy_smiley_face.png',
            }}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Text style={styles.username}>{userData.username}</Text>
          <Text style={styles.email}>{userData.email}</Text>

          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Verified</Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditAccount')}
          >
            <Text style={styles.editButtonText}>Edit Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                if (item.title === "Logout") {
                  logout();
                } else {
                  navigation.navigate(item.screen);
                }
              }}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={24} color="#333" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  profileCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  verifiedBadge: {
    backgroundColor: "#4CD964",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 15,
  },
  verifiedText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  editButton: {
    backgroundColor: '#E86464',
    width: '100%',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuItemText: { fontSize: 16, marginLeft: 12, color: '#333', fontWeight: '500' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20, fontSize: 16 },
});