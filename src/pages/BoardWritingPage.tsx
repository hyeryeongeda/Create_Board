import React, { useState } from "react";
import {
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../styles/BoardWritingStyle";
import { BoardWritingScreenNavigationProp } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

type Props = {
  navigation: BoardWritingScreenNavigationProp;
  route: RouteProp<RootStackParamList, "BoardWriting">;
};

const BoardWritingScreen = ({ navigation, route }: Props) => {
  const { imageUri, boardData } = route.params;

  const [title, setTitle] = useState(boardData.title || "사건명");
  const [titleValue, setTitleValue] = useState(boardData.title || "");

  const [projectType, setProjectType] = useState(
    boardData.projectType || "공 종"
  );
  const [projectTypeValue, setProjectTypeValue] = useState(
    boardData.projectType || ""
  );

  const [location, setLocation] = useState(boardData.location || "위치");
  const [locationValue, setLocationValue] = useState(boardData.location || "");

  const [content, setContent] = useState(boardData.content || "내용");
  const [contentValue, setContentValue] = useState(boardData.content || "");

  const [date, setDate] = useState("일자");
  const [dateValue, setDateValue] = useState(boardData.date || "");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleNext = () => {
    navigation.navigate("Result", {
      boardData: {
        title: titleValue,
        projectType: projectTypeValue,
        location: locationValue,
        content: contentValue,
        date: dateValue,
      },
      imageUri,
    });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios"); // iOS에서는 Picker가 계속 열리도록 설정
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setDateValue(formattedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.labelInput}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.valueInput}
          value={titleValue}
          onChangeText={setTitleValue}
        />
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.labelInput}
          value={projectType}
          onChangeText={setProjectType}
        />
        <TextInput
          style={styles.valueInput}
          value={projectTypeValue}
          onChangeText={setProjectTypeValue}
        />
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.labelInput}
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.valueInput}
          value={locationValue}
          onChangeText={setLocationValue}
        />
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.labelInput}
          value={content}
          onChangeText={setContent}
        />
        <TextInput
          style={styles.valueInput}
          value={contentValue}
          onChangeText={setContentValue}
          multiline
        />
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.labelInput}
          value={date}
          onChangeText={setDate}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.valueInput}>
            {dateValue || "날짜를 선택하세요"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BoardWritingScreen;
