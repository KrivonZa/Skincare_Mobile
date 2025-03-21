// QuizNavigation.js
import { createStackNavigator } from "@react-navigation/stack";
import { QuizStatus } from "../../screens/homepage/quiz/quizList.jsx";

const QuizStack = createStackNavigator();

export function QuizNavigation() {
  return (
    <QuizStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff909a",
        },
        headerTintColor: "#ffffff",
        headerTitleAlign: "center",
      }}
    >
      <QuizStack.Screen
        name="QuizStatus"
        component={QuizStatus}
        options={{ title: "Quiz Status", headerShown: false }}
      />
    </QuizStack.Navigator>
  );
}
