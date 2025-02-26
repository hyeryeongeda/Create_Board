// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/pages/HomePage";
import SettingsScreen from "./src/pages/SettingsPage";
import CaptureSelectionScreen from "./src/pages/CaptureSelectionPage";
import BoardWritingScreen from "./src/pages/BoardWritingPage";
import ResultScreen from "./src/pages/ResultPage";
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
            fontSize: 25,
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
