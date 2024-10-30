import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // ScrollView의 컨텐츠가 가득 차도록 설정
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff", // 배경색 설정 (필요에 따라 조정 가능)
  },
  imageContainer: {
    marginTop: 150,
  },
  image: {
    width: "100%", // 전체 너비
    height: "auto", // 세로 길이를 자동으로 조정
    aspectRatio: 1, // 이미지 비율을 유지 (optional)
  },
  overlay: {
    position: "absolute", // 절대 위치 설정
    bottom: 0, // 하단에 위치
    left: 0, // 왼쪽에 위치
    backgroundColor: "white",
    padding: 10,
    width: "80%", // 너비를 적절히 설정
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
  saveButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#006994",
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
  },
});

export default styles;
