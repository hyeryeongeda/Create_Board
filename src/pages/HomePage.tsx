// src/screens/HomeScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import styles from "../styles/HomeStyles";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const menuItems = [
    {
      id: "photo",
      title: "사진",
      onPress: () =>
        navigation.navigate("CaptureSelection", {
          boardData: {
            title: "",
            projectType: "",
            location: "",
            content: "",
            date: "",
          },
          imageUri: "",
        }),
    },
    {
      id: "camera",
      title: "카메라",
      onPress: () =>
        navigation.navigate("CaptureSelection", {
          boardData: {
            title: "",
            projectType: "",
            location: "",
            content: "",
            date: "",
          },
          imageUri: "",
        }),
    },
    {
      id: "pdf",
      title: "pdf\n변환",
      onPress: () => navigation.navigate("Settings"),
    },
    {
      id: "method",
      title: "촬영\n방법",
      onPress: () => navigation.navigate("Settings"),
    },
    {
      id: "board",
      title: "보드판\n설정",
      onPress: () => navigation.navigate("Settings"),
    },
    {
      id: "settings",
      title: "설정",
      onPress: () => navigation.navigate("Settings"),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>CB</Text>
        </View>
        <Text style={styles.title}>공사 보드판 만들기</Text>
      </View>

      <View style={styles.gridContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.gridItem}
            onPress={item.onPress}
          >
            <View style={styles.gridItemInner}>
              <Text style={styles.gridItemText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Home;
