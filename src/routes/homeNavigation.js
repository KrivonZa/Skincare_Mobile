import React from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { BookingDetail, BookingTreatment } from "../screens/homepage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TreatmentNavigation, BookingNavigation } from "./homeRoute";
import { QuizNavigation } from "./homeRoute/quizNavigation"; // Named import
import { RoadmapScreen } from "../screens/homepage/roadmap/roadMapScreen";
import { AuthNavigation } from "./authNavigation";
import { BookingHistoryDetail } from "../screens/homepage/booking/bookingHistoryDetail";

const Drawer = createDrawerNavigator();
const Home = createStackNavigator();

function DrawerNavigation() {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName="Treatment"
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
        name="Treatment"
        component={TreatmentNavigation}
        options={{
          title: "Service",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Booking"
        component={BookingNavigation}
        options={{
          title: "Booking History",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={AuthNavigation} // Component giả, sẽ không dùng
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault(); // Ngăn chuyển sang AuthNavigation trực tiếp
            navigation.reset({
              index: 0,
              routes: [{ name: "Auth" }],
            });
          },
        }}
        options={{
          title: "Logout",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Quiz"
        component={QuizNavigation}
        options={{
          title: "Quiz",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="school-outline" size={size} color={color} />
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
        options={{ title: "Booking Detail", headerShown: true }}
      />
      <Home.Screen
        name="BookingTreatment"
        component={BookingTreatment}
        options={{ title: "Booking Service", headerShown: true }}
      />
      <Home.Screen
        name="RoadmapScreen"
        component={RoadmapScreen}
        options={{ title: "Roadmap Service", headerShown: true }}
      />
      <Home.Screen
        name="BookingHistoryDetail"
        component={BookingHistoryDetail}
        options={{ title: "Booking Detail", headerShown: true }}
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
