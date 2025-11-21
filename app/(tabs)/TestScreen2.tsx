import { ScrollView, StyleSheet, Text, View } from "react-native";

//react-native-reanimated
export default function TestScreen2() {
  return (
    <ScrollView>
      <View>
        <Text style={{ color: "green" }}>test1 screen 이에요</Text>
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
