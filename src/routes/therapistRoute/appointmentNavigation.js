import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Appointment } from "../../screens/therapist";

const AppointmentStack = createStackNavigator();

export function AppointmentNavigation() {
  return (
    <AppointmentStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff909a",
        },
        headerTintColor: "#ffffff",
        headerTitleAlign: "center",
      }}
    >
      <AppointmentStack.Screen
        name="Appointment"
        component={Appointment}
        options={{ title: "Appointment", headerShown: false }}
      />
    </AppointmentStack.Navigator>
  );
}
