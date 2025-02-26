export interface BoardSettings {
  width: number; // 보드판의 너비 비율 (0-1 사이 값)
  height: number; // 보드판의 높이 비율 (0-1 사이 값)
  position: {
    x: number; // 보드판의 X축 위치 비율 (0-1 사이 값)
    y: number; // 보드판의 Y축 위치 비율 (0-1 사이 값)
  };
}
