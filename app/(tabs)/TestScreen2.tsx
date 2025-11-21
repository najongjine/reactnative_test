import { evaluate } from "mathjs";
import { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

//react-native-reanimated
export default function TestScreen2() {
  // 계산기 버튼 배열 (이미지 순서대로 배치)
  const buttons = [
    ["(", ")", "%", "AC"],
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  // 버튼의 종류에 따라 배경색을 결정하는 함수
  const getBtnBackgroundColor = (btn: string) => {
    if (btn === "=") return "#1A73E8"; // 진한 파란색 (등호)
    if (["(", ")", "%", "AC", "÷", "×", "-", "+"].includes(btn))
      return "#E8F0FE"; // 연한 파란색 (연산자)
    return "#F1F3F4"; // 연한 회색 (숫자)
  };

  // 버튼의 종류에 따라 글자색을 결정하는 함수
  const getBtnTextColor = (btn: string) => {
    if (btn === "=") return "#FFFFFF"; // 흰색
    return "#202124"; // 검정색 (다크 그레이)
  };

  const [myinput, setMyinput] = useState<string>("");

  /* 계산하기 버튼 누르면 결과 보여주기 */
  async function calc() {
    evaluate(myinput);
  }
  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" />

      {/* 상단 결과창 영역 (디자인적 요소를 위해 추가) */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>12,345</Text>
      </View>

      {/* 버튼 영역 */}
      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn, btnIndex) => (
              <TouchableOpacity
                key={btnIndex}
                style={[
                  styles.button,
                  { backgroundColor: getBtnBackgroundColor(btn) },
                ]}
                activeOpacity={0.7} // 눌렀을 때 깜빡임 효과
                onPress={() => {
                  btn;
                }}
              >
                <Text
                  style={[styles.buttonText, { color: getBtnTextColor(btn) }]}
                >
                  {btn}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-end", // 버튼들을 아래로 배치
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
    paddingBottom: 30,
  },
  displayText: {
    fontSize: 60,
    color: "#202124",
    fontWeight: "400",
  },
  buttonsContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12, // 행 간 간격
  },
  button: {
    width: 80, // 버튼 너비 (화면 크기에 따라 %로 조정 가능)
    height: 80, // 버튼 높이
    borderRadius: 40, // 완전한 둥근 모양 (width/2)
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5, // 버튼 사이 좌우 간격
    elevation: 1, // 안드로이드 그림자 (선택사항)
  },
  buttonText: {
    fontSize: 26,
    fontWeight: "500",
  },
});
