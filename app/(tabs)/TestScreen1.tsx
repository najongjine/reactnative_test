import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

//react-native-reanimated
export default function TestScreen1() {
  const [myinput, setMyinput] = useState<string>("");

  return (
    <ScrollView>
      <View>
        <Text style={{ color: "green" }}>test1 screen 이에요</Text>
        <input placeholder="입력칸" />
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
