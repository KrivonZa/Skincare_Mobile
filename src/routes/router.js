import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthNavigation } from "./authNavigation";
import { HomeNavigation } from "./homeNavigation";
import { TherapistNavigation } from "./therapistNavigation";
import { ProfileNavigation } from "./profileNavigation";

const Stack = createStackNavigator();

export function AppRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
        }}
        initialRouteName="Auth"
      >
        <Stack.Screen
          name="Auth"
          component={AuthNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TherapistNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
