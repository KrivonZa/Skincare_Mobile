import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login, Signup } from "../screens/auth"

const Stack = createStackNavigator();

export function AuthNavigation({ navigation }) {

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const token = await AsyncStorage.getItem('accessToken');
  //     setIsLoggedIn(!!token);
  //   };

  //   checkLoginStatus();
  // }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigation.navigate("Main");
  //   }
  // }, [isLoggedIn, navigation]);

  // if (isLoggedIn === null) {
  //   return null;
  // }

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
