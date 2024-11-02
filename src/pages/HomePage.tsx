// src/screens/HomeScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import styles from "../styles/HomeStyles";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  const handleCaptureBoardPress = () => {
    navigation.navigate("CaptureSelection", {
      boardData: {
        title: "",
        projectType: "",
        location: "",
        content: "",
        date: "",
      }, // 초기값 설정
      imageUri: "", // 초기값 설정 (선택된 이미지가 없을 경우)
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleSettingsPress}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>설정</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleCaptureBoardPress}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>보드판 촬영</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
