import React from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { AppointmentDetail } from "../screens/therapist";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScheduleNavigation, AppointmentNavigation } from "./therapistRoute";
import { AuthNavigation } from "./authNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";

const Drawer = createDrawerNavigator();
const Therapist = createStackNavigator();

function DrawerNavigation() {
  const navigation = useNavigation();
  const { logout } = useAuth();
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
    <Drawer.Navigator
      initialRouteName="ScheduleNavigation"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff909a",
        },
        headerTintColor: "#ffffff",
        headerTitle: "",
        headerRight: () => (
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/Skincare-LogoMin-Pink.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Image
                source={require("../../assets/Profile-Pink.png")}
                style={styles.profile}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ),
        drawerActiveTintColor: "#ff6f61",
        drawerInactiveTintColor: "#333",
        drawerStyle: {
          paddingBottom: 10,
        },
      }}
    >
      <Drawer.Screen
        name="ScheduleNavigation"
        component={ScheduleNavigation}
        options={{
          title: "Schedule",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="calendar-number-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AppointmentNavigation"
        component={AppointmentNavigation}
        options={{
          title: "Appointment",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={AuthNavigation} // Component giả, sẽ không dùng
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault(); // Ngăn chuyển sang AuthNavigation trực tiếp
            handleLogout();
          },
        }}
        options={{
          title: "Logout",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export function TherapistNavigation() {
  return (
    <Therapist.Navigator
      initialRouteName="DrawerNavigation"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff909a",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Therapist.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      <Therapist.Screen
        name="AppointmentDetail"
        component={AppointmentDetail}
        options={{ title: "Appointment Detail", headerShown: true }}
      />
    </Therapist.Navigator>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 60,
  },
  profile: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
});
