import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile, EditAccount, QuizRecord } from "../screens/profile";

const Stack = createStackNavigator();

export function ProfileNavigation({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff909a",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Account"
        component={Profile}
        options={{
          title: "Tài khoản",
        }}
      />
      <Stack.Screen
        name="EditAccount"
        component={EditAccount}
        options={{
          title: "Chỉnh sửa Tài khoản",
        }}
      />
      <Stack.Screen
        name="QuizRecord"
        component={QuizRecord}
        options={{
          title: "Trắc nghiệm về da",
        }}
      />
    </Stack.Navigator>
  );
}
