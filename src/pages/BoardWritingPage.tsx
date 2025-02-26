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

  const [fields, setFields] = useState({
    title: {
      label: boardData.titleLabel || "사건명",
      value: boardData.title || "",
    },
    projectType: {
      label: boardData.projectTypeLabel || "공 종",
      value: boardData.projectType || "",
    },
    location: {
      label: boardData.locationLabel || "위치",
      value: boardData.location || "",
    },
    content: {
      label: boardData.contentLabel || "내용",
      value: boardData.content || "",
    },
    date: {
      label: boardData.dateLabel || "일자",
      value: boardData.date || "",
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateField = (
    fieldName: string,
    type: "label" | "value",
    newText: string
  ) => {
    setFields((prev) => ({
      ...prev,
      [fieldName as keyof typeof prev]: {
        ...prev[fieldName as keyof typeof prev],
        [type]: newText,
      },
    }));
  };

  const handleNext = () => {
    navigation.navigate("Result", {
      boardData: {
        title: fields.title.value,
        projectType: fields.projectType.value,
        location: fields.location.value,
        content: fields.content.value,
        date: fields.date.value,
      },
      imageUri,
    });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      updateField("date", "value", formattedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.labelInput}
          value={fields.title.label}
          onChangeText={(text) => updateField("title", "label", text)}
        />
        <TextInput
          style={styles.valueInput}
          value={fields.title.value}
          onChangeText={(text) => updateField("title", "value", text)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.labelInput}
          value={fields.projectType.label}
          onChangeText={(text) => updateField("projectType", "label", text)}
        />
        <TextInput
          style={styles.valueInput}
          value={fields.projectType.value}
          onChangeText={(text) => updateField("projectType", "value", text)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.labelInput}
          value={fields.location.label}
          onChangeText={(text) => updateField("location", "label", text)}
        />
        <TextInput
          style={styles.valueInput}
          value={fields.location.value}
          onChangeText={(text) => updateField("location", "value", text)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.labelInput}
          value={fields.content.label}
          onChangeText={(text) => updateField("content", "label", text)}
        />
        <TextInput
          style={styles.valueInput}
          value={fields.content.value}
          onChangeText={(text) => updateField("content", "value", text)}
          multiline
        />
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.labelInput}
          value={fields.date.label}
          onChangeText={(text) => updateField("date", "label", text)}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.valueInput}>
            {fields.date.value || "날짜를 선택하세요"}
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
