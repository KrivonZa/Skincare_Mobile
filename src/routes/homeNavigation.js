import React from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LandingPage,
  TreatmentPage,
  BookingStatus,
  BookingDetail,
  BookingTreatment
} from "../screens/homepage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();
const TreatmentStack = createStackNavigator();
const BookingStack = createStackNavigator();

// Navigation cho Treatment
function TreatmentNavigation() {
  return (
    <TreatmentStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff909a",
        },
        headerTintColor: "#ffffff",
        headerTitleAlign: "center",
      }}
    >
      <TreatmentStack.Screen
        name="TreatmentPage"
        component={TreatmentPage}
        options={{ title: "Dịch vụ Trị liệu", headerShown: false }}
      />
      <TreatmentStack.Screen
        name="BookingTreatment"
        component={BookingTreatment}
        options={{ title: "Đặt lịch Trị liệu", headerShown: true, }}
      />
    </TreatmentStack.Navigator>
  );
}

// Navigation cho Booking
function BookingNavigation() {
  return (
    <BookingStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff909a",
        },
        headerTintColor: "#ffffff",
        headerTitleAlign: "center",
      }}
    >
      <BookingStack.Screen
        name="BookingStatus"
        component={BookingStatus}
        options={{ title: "Trạng thái đặt lịch", headerShown: false }}
      />
      <BookingStack.Screen
        name="BookingDetail"
        component={BookingDetail}
        options={{ title: "Chi tiết đặt lịch", headerShown: true }}
      />
    </BookingStack.Navigator>
  );
}

export function HomeNavigation() {
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
          title: "Trang Chủ",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Treatment"
        component={TreatmentNavigation}
        options={{
          title: "Dịch vụ",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="medkit-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Booking"
        component={BookingNavigation}
        options={{
          title: "Lịch hẹn",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
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
