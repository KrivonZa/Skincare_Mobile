import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthNavigation } from "./authNavigation";
import { HomeNavigation } from "./homeNavigation";
import { TherapistNavigation } from "./therapistNavigation";
import { ProfileNavigation } from "./profileNavigation";
import { AuthProvider, useAuth } from "../context/AuthContext";

const Stack = createStackNavigator();

const MainNavigation = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <AuthNavigation />;
  }

  return user.role === "Therapist" ? (
    <TherapistNavigation />
  ) : (
    <HomeNavigation />
  );
};

export function AppRouter() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
          }}
          initialRouteName="Main"
        >
          <Stack.Screen
            name="Main"
            component={MainNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Auth"
            component={AuthNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
