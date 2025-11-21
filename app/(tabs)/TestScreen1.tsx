import { evaluate } from "mathjs";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

//react-native-reanimated
export default function TestScreen1() {
  const [myinput, setMyinput] = useState<string>("");

  /* mathjs 문서를 보고, evaluate 을 수행할수 있는 함수를 만드시오 */
  async function calc() {
    evaluate(`1+2`);
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
