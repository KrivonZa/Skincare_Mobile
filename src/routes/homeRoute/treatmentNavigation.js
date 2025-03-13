import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TreatmentPage, BookingTreatment } from "../../screens/homepage";

const TreatmentStack = createStackNavigator();

export function TreatmentNavigation() {
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
    </TreatmentStack.Navigator>
  );
}
