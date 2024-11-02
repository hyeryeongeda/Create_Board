// src/components/BoardOverlay.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type BoardOverlayProps = {
  title: string;
  projectType: string;
  location: string;
  content: string;
  date: string;
};

const BoardOverlay = ({
  title,
  projectType,
  location,
  content,
  date,
}: BoardOverlayProps) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.row}>
        <Text style={[styles.cell, styles.label]}>사건명</Text>
        <Text style={[styles.cell, styles.value]}>{title}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.cell, styles.label]}>공 종</Text>
        <Text style={[styles.cell, styles.value]}>{projectType}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.cell, styles.label]}>위 치</Text>
        <Text style={[styles.cell, styles.value]}>{location}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.cell, styles.label]}>내 용</Text>
        <Text style={[styles.cell, styles.value]}>{content}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.cell, styles.label]}>일 자</Text>
        <Text style={[styles.cell, styles.value]}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    borderWidth: 1,
    borderColor: "#000", // 셀 경계선
    padding: 8,
    fontSize: 14,
  },
  label: {
    width: "30%",
    fontWeight: "bold",
    textAlign: "center",
  },
  value: {
    width: "70%",
  },
});

export default BoardOverlay;
