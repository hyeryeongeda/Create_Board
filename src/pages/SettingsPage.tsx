// SettingsScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BoardSettings } from "types/settings";
import { Switch } from "react-native";

const SettingsPage = () => {
  const [settings, setSettings] = useState<BoardSettings>({
    width: 0.8,
    height: 0.3,
    position: {
      x: 0.1,
      y: 0.1,
    },
  });

  const saveSettings = async (newSettings: BoardSettings) => {
    try {
      await AsyncStorage.setItem("boardSettings", JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error("설정 저장 실패:", error);
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem("boardSettings");
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error("설정 로드 실패:", error);
      }
    };

    loadSettings();
  }, []);

  const settingsItems = [
    {
      title: "폰트 크기",
      value: "20.0",
      type: "text",
    },
    {
      title: "폰트 정렬",
      value: "왼쪽",
      type: "text",
    },
    {
      title: "보드판 위치",
      value: "좌측-하단",
      type: "text",
    },
    {
      title: "보드 크기",
      value: `${Math.round(settings.width * 100)}%`,
      type: "slider",
      sliderProps: {
        value: settings.width,
        onValueChange: (value: number) =>
          saveSettings({ ...settings, width: value }),
        minimumValue: 0.3,
        maximumValue: 1,
      },
    },
  ];

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      {item.type === "text" ? (
        <Text style={styles.itemValue}>{item.value}</Text>
      ) : item.type === "slider" ? (
        <Slider {...item.sliderProps} style={styles.slider} />
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>보드판 설정</Text>

      <FlatList
        data={settingsItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemTitle: {
    fontSize: 16,
  },
  itemValue: {
    fontSize: 16,
    color: "#666",
  },
  slider: {
    flex: 1,
    marginLeft: 10,
  },
  list: {
    flex: 1,
  },
});

export default SettingsPage;
