import { createStackNavigator } from "@react-navigation/stack";
import { BookingStatus, BookingDetail } from "../../screens/homepage";

const BookingStack = createStackNavigator();

export function BookingNavigation() {
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
    </BookingStack.Navigator>
  );
}
