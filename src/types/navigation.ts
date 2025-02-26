// src/types/navigation.ts
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// 네비게이션 파라미터 목록 정의
export type RootStackParamList = {
  Home: undefined; // 홈 화면은 매개변수가 필요 없음
  Settings: undefined; // 설정 화면도 마찬가지
  CaptureSelection: { boardData: any; imageUri: string }; // CaptureSelection 화면은 boardData와 imageUri가 필요함
  BoardWriting: {
    boardData: {
      [x: string]: string;
      title: string;
      projectType: string;
      location: string;
      content: string;
      date: string;
    };
    imageUri: string;
  };
  Result: {
    boardData: {
      title: string;
      projectType: string;
      location: string;
      content: string;
      date: string;
    };
    imageUri: string;
  };
};

// BoardWritingScreen의 네비게이션 타입
export type BoardWritingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BoardWriting"
>;

// CaptureSelectionScreen의 네비게이션 및 라우트 타입
export type CaptureSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CaptureSelection"
>;
export type CaptureSelectionScreenRouteProp = RouteProp<
  RootStackParamList,
  "CaptureSelection"
>;

// ResultScreen의 라우트 타입 추가
export type ResultScreenRouteProp = RouteProp<RootStackParamList, "Result">;
