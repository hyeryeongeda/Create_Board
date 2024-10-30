// src/screens/HomeScreenStyles.ts
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // 배경색 추가
  },
  buttonContainer: {
    width: 200, // 버튼 너비 설정
    marginVertical: 10, // 위아래로 10px 간격
  },
  button: {
    backgroundColor: "#006994", // 버튼 색상
    paddingVertical: 15, // 버튼의 세로 패딩
    borderRadius: 5, // 네모난 버튼 모서리 둥글기
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default styles;
