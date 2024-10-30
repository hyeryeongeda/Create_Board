import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import ViewShot from "react-native-view-shot";
import styles from "../styles/ResultStyle";

type ResultScreenProps = {
  route: RouteProp<RootStackParamList, "Result">;
};

const ResultScreen = ({ route }: ResultScreenProps) => {
  const { imageUri, boardData } = route.params;
  const viewRef = useRef<ViewShot | null>(null);

  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);

  useEffect(() => {
    Image.getSize(imageUri, (width, height) => {
      const screenWidth = Dimensions.get("window").width;
      const aspectRatio = width / height;
      const calculatedHeight = screenWidth / aspectRatio;
      setImageWidth(screenWidth);
      setImageHeight(calculatedHeight);
    });
  }, [imageUri]);

  const saveImageToGallery = async () => {
    if (viewRef.current) {
      try {
        const uri = await viewRef.current.capture();
        if (uri) {
          await MediaLibrary.createAssetAsync(uri);
          Alert.alert("이미지 저장", "이미지가 갤러리에 저장되었습니다.");
        } else {
          Alert.alert("오류", "이미지를 캡처하는데 실패했습니다.");
        }
      } catch (error) {
        console.error("이미지 저장 중 오류 발생:", error);
        Alert.alert("오류", "이미지를 저장하는데 실패했습니다.");
      }
    } else {
      Alert.alert("오류", "뷰가 준비되지 않았습니다.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      <ViewShot ref={viewRef} options={{ format: "png", quality: 0.9 }}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={{ width: imageWidth, height: imageHeight }}
            resizeMode="contain"
          />
          <View style={[styles.overlay, { bottom: imageHeight * 0.05 }]}>
            <Text style={styles.text}>용역명: {boardData.title}</Text>
            <Text style={styles.text}>공종: {boardData.projectType}</Text>
            <Text style={styles.text}>위치: {boardData.location}</Text>
            <Text style={styles.text}>내용: {boardData.content}</Text>
          </View>
        </View>
      </ViewShot>

      <TouchableOpacity onPress={saveImageToGallery} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>갤러리에 저장</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ResultScreen;
