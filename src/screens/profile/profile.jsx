// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   Button,
// } from "react-native";
// import { useState, useEffect, useRef } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// export function Profile() {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text>Profile</Text>
//       <Button title="Edit Account" onPress={() => navigation.navigate("EditAccount")}></Button>
//       <Button title="Quiz Record" onPress={() => navigation.navigate("QuizRecord")}></Button>
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
  Image,
  ScrollView,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function Profile() {
  const navigation = useNavigation();

  const menuItems = [
    {
      title: "Skin Profile",
      icon: "body-outline",
      screen: "SkinProfile",
    },
    {
      title: "Medical Records",
      icon: "document-text-outline",
      screen: "MedicalRecords",
    },
    {
      title: "Settings",
      icon: "settings-outline",
      screen: "Settings",
    },
    {
      title: "Logout",
      icon: "log-out-outline",
      screen: "Logout",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Happy_smiley_face.png/640px-Happy_smiley_face.png" }}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Text style={styles.username}>User12345</Text>
          <Text style={styles.email}>user123@gmail.com</Text>
          
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate("EditAccount")}
          >
            <Text style={styles.editButtonText}>Edit Account</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={24} color="#333" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileCard: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#E86464",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  menuContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
    fontWeight: "500",
  },
});