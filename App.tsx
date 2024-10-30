// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import CaptureSelectionScreen from "./src/screens/CaptureSelectionScreen";
import BoardWritingScreen from "./src/screens/BoardWritingScreen";
import ResultScreen from "./src/screens/ResultScreen";
import { RootStackParamList } from "./src/types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#006994",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 35,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "홈" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "설정" }}
        />
        <Stack.Screen
          name="CaptureSelection"
          component={CaptureSelectionScreen}
          options={{ title: "사진 선택" }}
        />
        <Stack.Screen
          name="BoardWriting"
          component={BoardWritingScreen}
          options={{ title: "보드 작성" }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: "결과" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
