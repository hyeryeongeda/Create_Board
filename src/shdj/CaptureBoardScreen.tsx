// src/screens/CaptureBoardScreen.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { captureRef } from "react-native-view-shot";
import styles from "./CaptureBoardStyle";
import dayjs from "dayjs";

const CaptureBoardScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  // 상태 변수 선언
  const [titleLabel, setTitleLabel] = useState("용역명");
  const [projectTypeLabel, setProjectTypeLabel] = useState("공 종");
  const [locationLabel, setLocationLabel] = useState("위치");
  const [contentLabel, setContentLabel] = useState("내용");
  const [dateLabel, setDateLabel] = useState("일자");
  const [title, setTitle] = useState("");
  const [projectType, setProjectType] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");

  const handleDateSelect = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setCalendarVisible(false); // 캘린더 닫기
  };

  const today = dayjs().format("YYYY-MM-DD");

  // 이미지 선택 함수
  const openCamera = () => {
    launchCamera({ mediaType: "photo" }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary(
      { mediaType: "photo", selectionLimit: 1 },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri || null);
        }
      }
    );
  };

  // 이미지 저장 함수
  const saveImage = async (ref: React.RefObject<View>) => {
    try {
      const uri = await captureRef(ref, {
        format: "jpg",
        quality: 0.8,
      });
      console.log("Saved image URI:", uri);
    } catch (error) {
      console.error("Failed to save image:", error);
    }
  };

  const imageRef = React.createRef<View>();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* 이미지와 오버레이를 감싸는 View */}
        {imageUri && (
          <View ref={imageRef} style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>
                {titleLabel}: {title}
              </Text>
              <Text style={styles.overlayText}>
                {projectTypeLabel}: {projectType}
              </Text>
              <Text style={styles.overlayText}>
                {locationLabel}: {location}
              </Text>
              <Text style={styles.overlayText}>
                {contentLabel}: {content}
              </Text>
              <Text style={styles.overlayText}>
                {dateLabel}: {selectedDate || today}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>카메라 열기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openGallery}>
          <Text style={styles.buttonText}>갤러리 사진 선택</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => saveImage(imageRef)}
        >
          <Text style={styles.buttonText}>이미지 저장</Text>
        </TouchableOpacity>

        {/* 사진 옵션 선택 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.optionButton}
              >
                <Text style={styles.optionText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default CaptureBoardScreen;
