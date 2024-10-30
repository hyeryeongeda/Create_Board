// src/screens/BoardWritingScreen.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import styles from "../styles/BoardWritingStyle";
import { BoardWritingScreenNavigationProp } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

type Props = {
  navigation: BoardWritingScreenNavigationProp;
  route: RouteProp<RootStackParamList, "BoardWriting">; // RouteProp 추가
};

const BoardWritingScreen = ({ navigation, route }: Props) => {
  const { imageUri, boardData } = route.params; // imageUri와 boardData 받아오기
  const [title, setTitle] = useState(boardData.title || ""); // 초기값 설정
  const [projectType, setProjectType] = useState(boardData.projectType || "");
  const [location, setLocation] = useState(boardData.location || "");
  const [content, setContent] = useState(boardData.content || "");
  const [date, setDate] = useState("");

  const handleNext = () => {
    navigation.navigate("CaptureSelection", {
      boardData: { title, projectType, location, content, date },
      imageUri, // 선택된 이미지 URI 전달
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="용역명"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="공 종"
        value={projectType}
        onChangeText={setProjectType}
      />
      <TextInput
        style={styles.input}
        placeholder="위치"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="내용"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="일자"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BoardWritingScreen;
