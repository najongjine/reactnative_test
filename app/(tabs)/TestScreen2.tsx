import { evaluate } from "mathjs";
import { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TestScreen2() {
  // 🔥 이미지에 맞춘 8열 구조의 버튼 배열로 재구성
  // 각 행은 8개의 버튼을 가질 수 있도록 배열을 합쳤습니다.
  const buttons = [
    ["Rad", "|", "Deg", "x!", "(", ")", "%", "AC"],
    ["Inv", "sin", "ln", "7", "8", "9", "÷"],
    ["π", "cos", "log", "4", "5", "6", "×"],
    ["e", "tan", "√", "1", "2", "3", "-"],
    ["Ans", "EXP", "xʸ", "0", ".", "=", "+"],
  ];

  // 버튼의 종류에 따라 배경색을 결정하는 함수
  const getBtnBackgroundColor = (btn: string) => {
    if (btn === "=") return "#1A73E8"; // 진한 파란색 (등호)
    // 공학용 버튼, 연산자, AC, %, 괄호 등은 연한 파란색
    if (
      [
        "(",
        ")",
        "%",
        "AC",
        "÷",
        "×",
        "-",
        "+",
        "Inv",
        "sin",
        "ln",
        "π",
        "cos",
        "log",
        "e",
        "tan",
        "√",
        "Ans",
        "EXP",
        "xʸ",
        "Rad",
        "Deg",
        "x!",
        "|",
      ].includes(btn)
    )
      return "#E8F0FE"; // 연한 파란색 (연산자)
    return "#F1F3F4"; // 연한 회색 (숫자, 소수점)
  };

  // 버튼의 종류에 따라 글자색을 결정하는 함수
  const getBtnTextColor = (btn: string) => {
    if (btn === "=") return "#FFFFFF"; // 흰색
    if (["Rad", "Deg", "|"].includes(btn)) return "#1A73E8"; // Rad/Deg/Separator는 파란색 텍스트
    return "#202124"; // 검정색 (다크 그레이)
  };

  const [myinput, setMyinput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  /* 버튼 처리 함수 (기존 로직 유지) */
  const handlePress = (btn: string) => {
    switch (btn) {
      case "AC":
        setMyinput("");
        setResult("0");
        break;
      case "=":
        try {
          // 입력된 식의 오류를 방지하기 위해 정규화
          let expression = myinput
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/xʸ/g, "**");

          const calculatedResult = evaluate(expression).toString();
          setResult(calculatedResult);
          setMyinput(calculatedResult);
          setMyinput("");
        } catch (error) {
          setResult("Error");
          setMyinput("");
        }
        break;
      case "xʸ":
        setMyinput((prev) => prev + "**");
        break;
      case "÷":
        setMyinput((prev) => prev + "/");
        break;
      case "×":
        setMyinput((prev) => prev + "*");
        break;
      case "ln":
      case "log":
      case "sin":
      case "cos":
      case "tan":
      case "√":
      case "π":
      case "e":
        setMyinput((prev) => prev + btn + "(");
        break;
      case "x!":
        setMyinput((prev) => prev + "!");
        break;
      case "|": // Separator는 기능 없음
        break;
      case "Rad":
      case "Deg":
      case "Inv":
      case "Ans":
      case "EXP":
        // 기능은 없으나 입력창에 표시만 되도록 처리 (옵션)
        setMyinput((prev) => prev + btn);
        break;
      default:
        setMyinput((prev) => prev + btn); // "7" + "x" -> 7x9
        break;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View>
        {/* 결과 값 */}
        <Text style={styles.displayText} numberOfLines={1}>
          결과 : {result}
        </Text>
      </View>

      {/* 상단 결과창 영역 */}
      <View style={styles.displayContainer}>
        {/* 히스토리 아이콘 */}
        <Text style={styles.historyIcon}>
          {/* Unicode Clockwise Open Circle Arrow */}
          {myinput.length > 0 ? "↺" : ""}
        </Text>

        {/* 입력 값 */}
        <Text style={styles.inputDisplayText} numberOfLines={2}>
          {myinput}
        </Text>
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
                  // 8열 중 빈 칸에 들어갈 버튼의 크기 조정 (가장 넓은 버튼은 "=" 버튼)
                  btn === "=" ? styles.equalsButton : {},
                  row.length > 4 && row.length < 8 ? styles.smallButton : {},
                  btn === "Rad" || btn === "Deg" ? styles.radDegLayout : {},
                  btn === "|" ? styles.separatorLayout : {},
                ]}
                activeOpacity={0.7}
                onPress={() => handlePress(btn)}
                disabled={btn === "|"} // Separator는 누르지 못하도록 비활성화
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: StatusBar.currentHeight,
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
    paddingBottom: 20,
    flexDirection: "row", // 아이콘과 텍스트를 한 줄에 두기 위함
    flexWrap: "wrap",
  },
  historyIcon: {
    fontSize: 20,
    color: "#757575",
    alignSelf: "flex-end",
    marginBottom: 60, // 결과값 기준 위치 조정
    marginRight: 10,
    minWidth: 20,
  },
  inputDisplayText: {
    flex: 1,
    fontSize: 30,
    color: "#757575",
    fontWeight: "400",
    marginBottom: 5,
    textAlign: "right",
    minHeight: 30,
  },
  displayText: {
    flex: 1,
    fontSize: 60,
    color: "#202124",
    fontWeight: "400",
    textAlign: "right",
    minHeight: 60,
  },
  buttonsContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  // 기본 버튼 스타일 (4열 기준)
  button: {
    flex: 1,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  // 공학용 버튼처럼 작은 공간에 몰려 있는 버튼 스타일 (8열 기준)
  smallButton: {
    flex: 1,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  // '=' 버튼 스타일 (2칸 차지)
  equalsButton: {
    flex: 2,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 4,
  },
  // Rad/Deg의 특별한 레이아웃 스타일
  radDegLayout: {
    flex: 1.5,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 0,
    backgroundColor: "transparent", // 배경색은 따로 설정
  },
  separatorLayout: {
    flex: 0.1,
    height: 60,
    borderRadius: 0,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20, // 텍스트 크기를 이미지에 맞게 약간 줄임
    fontWeight: "500",
  },
});
