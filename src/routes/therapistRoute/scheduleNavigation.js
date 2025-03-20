import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Schedule } from "../../screens/therapist";

const ScheduleStack = createStackNavigator();

export function ScheduleNavigation() {
  return (
    <ScheduleStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff909a",
        },
        headerTintColor: "#ffffff",
        headerTitleAlign: "center",
      }}
    >
      <ScheduleStack.Screen
        name="Schedule"
        component={Schedule}
        options={{ title: "Schedule", headerShown: false }}
      />
    </ScheduleStack.Navigator>
  );
}
