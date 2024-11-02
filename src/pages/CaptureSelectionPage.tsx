// src/screens/CaptureSelectionScreen.tsx
import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // expo-image-picker로 수정
import styles from "../styles/CaptureSelectionStyle";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type CaptureSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CaptureSelection"
>;
type CaptureSelectionScreenRouteProp = RouteProp<
  RootStackParamList,
  "CaptureSelection"
>;

const CaptureSelectionScreen = () => {
  const navigation = useNavigation<CaptureSelectionScreenNavigationProp>();
  const route = useRoute<CaptureSelectionScreenRouteProp>();
  const { boardData } = route.params;

  // 카메라 권한 요청 함수
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "카메라 권한 필요",
          message: "이 앱에서 사진을 촬영하려면 카메라 권한이 필요합니다.",
          buttonNeutral: "나중에",
          buttonNegative: "취소",
          buttonPositive: "확인",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS는 별도 권한 요청 없이 자동 허용
  };

  // 카메라 열기 함수
  const handleCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert("카메라 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      console.log("User cancelled camera picker");
    } else if (result.assets && result.assets[0].uri) {
      // 이미지를 선택한 후 BoardWritingScreen으로 이동
      navigation.navigate("BoardWriting", {
        imageUri: result.assets[0].uri,
        boardData,
      });
    }
  };

  // 갤러리 열기 함수
  const handleGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== "granted") {
      Alert.alert("갤러리 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      console.log("User cancelled gallery picker");
    } else if (result.assets && result.assets[0].uri) {
      // 이미지를 선택한 후 BoardWritingScreen으로 이동
      navigation.navigate("BoardWriting", {
        imageUri: result.assets[0].uri,
        boardData,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCamera}>
        <Text style={styles.buttonText}>카메라 열기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGallery}>
        <Text style={styles.buttonText}>갤러리에서 사진 선택</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CaptureSelectionScreen;
