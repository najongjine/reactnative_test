import { evaluate } from "mathjs";
import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

//react-native-reanimated
export default function TestScreen1() {
  const [myinput, setMyinput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  /* 계산하기 버튼 누르면 결과 보여주기 */
  async function calc() {
    try {
      let result = evaluate(myinput);
      setResult(result);
    } catch (error: any) {
      setResult(error?.message ?? "");
    }
  }
  return (
    <ScrollView>
      <View>
        <Text style={{ color: "green" }}>test1 screen 이에요</Text>
        <Text>입력 확인용: {myinput}</Text>
        <TextInput
          value={myinput}
          placeholder="입력칸"
          onChangeText={setMyinput}
        />
        <Button title="계산하기" onPress={calc} />
        <Text>계산결과 : {result}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
