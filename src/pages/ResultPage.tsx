import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import ViewShot from "react-native-view-shot";
import styles from "../styles/ResultStyle";
import BoardOverlay from "../components/BoardOverlay"; // BoardOverlay 컴포넌트 임포트

type ResultScreenProps = {
  route: RouteProp<RootStackParamList, "Result">;
};

const ResultScreen = ({ route }: ResultScreenProps) => {
  const { imageUri, boardData } = route.params;
  const viewRef = useRef<ViewShot | null>(null);

  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "권한 필요",
          "갤러리에 이미지를 저장하려면 권한이 필요합니다."
        );
      }
    };
    requestPermission();
  }, []);

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
    if (viewRef.current && viewRef.current.capture) {
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
    <View style={styles.container}>
      {/* ViewShot을 이미지와 보드판을 감싸는 컨테이너로 설정 */}
      <ViewShot ref={viewRef} options={{ format: "png", quality: 0.9 }}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={[styles.image, { width: imageWidth, height: imageHeight }]}
          />
          <View style={styles.overlayContainer}>
            <BoardOverlay
              title={boardData.title}
              projectType={boardData.projectType}
              location={boardData.location}
              content={boardData.content}
              date={boardData.date}
            />
          </View>
        </View>
      </ViewShot>

      <TouchableOpacity onPress={saveImageToGallery} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>갤러리에 저장</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultScreen;
