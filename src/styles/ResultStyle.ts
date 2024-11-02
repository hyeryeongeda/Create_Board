import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "relative",
    width: screenWidth,
    height: screenWidth, // 화면 너비와 동일한 높이로 설정
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlayContainer: {
    position: "absolute",
    bottom: 5, // 이미지 하단에서 약간 위로 설정
    left: 5, // 왼쪽에 고정된 위치로 설정
    width: "55%", // 너비를 적절히 조정하여 이미지 왼쪽 하단에 위치
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#006994",
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
