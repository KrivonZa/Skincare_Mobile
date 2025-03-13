import React from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LandingPage,
  BookingDetail,
  BookingTreatment,
} from "../screens/homepage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TreatmentNavigation, BookingNavigation } from "./homeRoute";

const Drawer = createDrawerNavigator();
const Home = createStackNavigator();

function DrawerNavigation() {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName="LandingPage"
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
      }}
    >
      <Drawer.Screen
        name="LandingPage"
        component={LandingPage}
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Treatment"
        component={TreatmentNavigation}
        options={{
          title: "Treatment",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="medkit-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Booking"
        component={BookingNavigation}
        options={{
          title: "Booking Schedule",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export function HomeNavigation() {
  return (
    <Home.Navigator
      initialRouteName="DrawerNavigation"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff909a",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Home.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      <Home.Screen
        name="BookingDetail"
        component={BookingDetail}
        options={{ title: "Chi tiết đặt lịch", headerShown: true }}
      />
      <Home.Screen
        name="BookingTreatment"
        component={BookingTreatment}
        options={{ title: "Đặt lịch Trị liệu", headerShown: true }}
      />
    </Home.Navigator>
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
